from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

SUBJECT_CHOICES = [
    ("Math", "Math"),
    ("English", "English"),
    ("Science", "Science"),
    ("History", "History"),
    ("Computer", "Computer"),
]

GRADE_CHOICES = [
    ("Grade9", "Grade 9"),
    ("Grade10", "Grade 10"),
    ("Grade11", "Grade 11"),
    ("Grade12", "Grade 12"),
]

class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_files')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES, default="Math")
    grade = models.CharField(max_length=50, choices=GRADE_CHOICES, default="Grade9")
    file_name = models.CharField(max_length=255)
    file_url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.subject}-{self.grade})"
