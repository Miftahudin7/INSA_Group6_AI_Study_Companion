from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from supabase import create_client
from .models import UploadedFile
from .serializers import UploadedFileSerializer

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

        # Connect to Supabase
        supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

        # Organize file path: username/grade/subject/filename
        file_path = f"{request.user.username}/{grade}/{subject}/{uploaded_file.name}"
        bucket_name = "uploads"

        res = supabase_client.storage.from_(bucket_name).upload(file_path, uploaded_file.read())
        if res.get("error"):
            return Response({'error': res["error"]["message"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Get public URL
        public_url = supabase_client.storage.from_(bucket_name).get_public_url(file_path)

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
