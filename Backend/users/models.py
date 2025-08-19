from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    # Add your settings fields here, for example:
    notifications_enabled = models.BooleanField(default=True)
    theme = models.CharField(max_length=20, default='light')

    def __str__(self):
        return f"{self.user.username}'s settings"

class StudyStreak(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='streak')
    streak_count = models.PositiveIntegerField(default=0)
    last_study_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s study streak"