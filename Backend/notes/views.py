from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from supabase import create_client
from core.supabase_client import supabase as supabase_client_singleton
from .models import UploadedFile, CommonBook
from .serializers import UploadedFileSerializer, CommonBookSerializer
import re

class FileUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        uploaded_file = request.FILES.get('file')
        title = request.data.get('title')
        description = request.data.get('description', '')
        subject = request.data.get('subject')
        grade = request.data.get('grade')

        if not uploaded_file or not title or not subject or not grade:
            return Response({'error': 'File, title, subject, and grade are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Validate choices
        if subject not in dict(UploadedFile._meta.get_field('subject').choices):
            return Response({'error': 'Invalid subject.'}, status=status.HTTP_400_BAD_REQUEST)
        if grade not in dict(UploadedFile._meta.get_field('grade').choices):
            return Response({'error': 'Invalid grade.'}, status=status.HTTP_400_BAD_REQUEST)

        # Use shared Supabase client
        supabase_client = supabase_client_singleton

        # Organize file path: username/grade/subject/filename (sanitize to avoid invalid characters)
        def sanitize(segment: str) -> str:
            return re.sub(r"[^A-Za-z0-9._-]", "-", segment.strip())

        safe_user = sanitize(request.user.username)
        safe_grade = sanitize(grade)
        safe_subject = sanitize(subject)
        safe_filename = sanitize(uploaded_file.name)

        file_path = f"{safe_user}/{safe_grade}/{safe_subject}/{safe_filename}"
        bucket_name = "uploads"

        # Ensure bucket exists (idempotent)
        try:
            # Create bucket if missing (idempotent). If it already exists, ignore error.
            supabase_client.storage.create_bucket(bucket_name, public=True)
        except Exception:
            pass

        # Upload file
        try:
            res = supabase_client.storage.from_(bucket_name).upload(file_path, uploaded_file.read())
            if isinstance(res, dict) and res.get("error"):
                return Response({'error': res["error"]["message"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': f'Upload failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Get public URL
        public_url = supabase_client.storage.from_(bucket_name).get_public_url(file_path)
        if isinstance(public_url, dict):
            public_url = public_url.get('publicURL') or public_url.get('public_url') or ''

        # Save metadata
        file_record = UploadedFile.objects.create(
            user=request.user,
            title=title,
            description=description,
            subject=subject,
            grade=grade,
            file_name=uploaded_file.name,
            file_url=public_url
        )

        serializer = UploadedFileSerializer(file_record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GetUserFilesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        files = UploadedFile.objects.filter(user=request.user).order_by('-uploaded_at')
        serializer = UploadedFileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetCommonBooksView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        subject = request.query_params.get('subject')
        grade = request.query_params.get('grade')
        
        books = CommonBook.objects.filter(is_active=True)
        
        if subject:
            books = books.filter(subject=subject)
        if grade:
            books = books.filter(grade=grade)
            
        serializer = CommonBookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
