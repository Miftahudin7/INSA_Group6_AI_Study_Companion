import os
from typing import Optional
import PyPDF2
from docx import Document

class FileProcessor:
    def __init__(self):
        self.supported_extensions = ['.pdf', '.docx', '.doc', '.txt']

    def extract_text(self, file_path: str) -> Optional[str]:
        """Extract text from various file formats"""
        if not os.path.exists(file_path):
            return None
        
        file_extension = os.path.splitext(file_path)[1].lower()
        
        try:
            if file_extension == '.pdf':
                return self._extract_from_pdf(file_path)
            elif file_extension in ['.docx', '.doc']:
                return self._extract_from_docx(file_path)
            elif file_extension == '.txt':
                return self._extract_from_txt(file_path)
            else:
                return f"Unsupported file format: {file_extension}"
        except Exception as e:
            return f"Error processing file: {str(e)}"

    def _extract_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        return text.strip()

    def _extract_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX file"""
        doc = Document(file_path)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text.strip()

    def _extract_from_txt(self, file_path: str) -> str:
        """Extract text from TXT file"""
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read().strip()

    def is_supported(self, file_path: str) -> bool:
        """Check if file format is supported"""
        file_extension = os.path.splitext(file_path)[1].lower()
        return file_extension in self.supported_extensions 