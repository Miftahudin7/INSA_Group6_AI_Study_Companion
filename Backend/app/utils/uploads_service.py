import os
import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import UploadFile
from ..models.uploads import UserUpload
from ..schemas.uploads import UserUploadCreate
from .file_processor import FileProcessor

class UploadsService:
    def __init__(self, db: Session):
        self.db = db
        self.file_processor = FileProcessor()
        self.uploads_dir = "uploads"
        os.makedirs(self.uploads_dir, exist_ok=True)

    def upload_file(self, file: UploadFile) -> UserUpload:
        """Upload a file and save to database"""
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(self.uploads_dir, unique_filename)
        
        # Save file to disk
        with open(file_path, "wb") as buffer:
            content = file.file.read()
            buffer.write(content)
        
        # Create database record
        upload = UserUpload(
            filename=file.filename,
            file_type=file.content_type or "application/octet-stream",
            file_size=len(content),
            upload_status="uploaded",
            file_path=file_path
        )
        
        self.db.add(upload)
        self.db.commit()
        self.db.refresh(upload)
        
        return upload

    def get_uploads(self, skip: int = 0, limit: int = 100) -> List[UserUpload]:
        """Get all uploads"""
        return self.db.query(UserUpload).offset(skip).limit(limit).all()

    def get_upload(self, upload_id: int) -> Optional[UserUpload]:
        """Get upload by ID"""
        return self.db.query(UserUpload).filter(UserUpload.id == upload_id).first()

    def delete_upload(self, upload_id: int) -> bool:
        """Delete an upload"""
        upload = self.get_upload(upload_id)
        if upload:
            # Delete file from disk
            if upload.file_path and os.path.exists(upload.file_path):
                os.remove(upload.file_path)
            
            # Delete from database
            self.db.delete(upload)
            self.db.commit()
            return True
        return False

    def process_upload(self, upload_id: int) -> bool:
        """Process an uploaded file"""
        upload = self.get_upload(upload_id)
        if not upload:
            return False
        
        try:
            # Update status to processing
            upload.upload_status = "processing"
            self.db.commit()
            
            # Process file
            if upload.file_path and os.path.exists(upload.file_path):
                content = self.file_processor.extract_text(upload.file_path)
                upload.processed_content = content
                upload.upload_status = "completed"
            else:
                upload.upload_status = "failed"
            
            self.db.commit()
            return True
        except Exception as e:
            upload.upload_status = "failed"
            self.db.commit()
            return False

    def get_upload_content(self, upload_id: int) -> Optional[str]:
        """Get processed content of an upload"""
        upload = self.get_upload(upload_id)
        if upload and upload.processed_content:
            return upload.processed_content
        return None

    def get_statistics(self) -> dict:
        """Get upload statistics"""
        total_uploads = self.db.query(UserUpload).count()
        completed_uploads = self.db.query(UserUpload).filter(UserUpload.upload_status == "completed").count()
        failed_uploads = self.db.query(UserUpload).filter(UserUpload.upload_status == "failed").count()
        processing_uploads = self.db.query(UserUpload).filter(UserUpload.upload_status == "processing").count()
        
        return {
            "total_uploads": total_uploads,
            "completed_uploads": completed_uploads,
            "failed_uploads": failed_uploads,
            "processing_uploads": processing_uploads
        } 