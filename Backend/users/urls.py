from django.urls import path
from .views import MyTokenObtainPairView, MyTokenRefreshView, RegisterView, LogoutView, UserProfileView, UserSettingsView, StudyStreakView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('settings/', UserSettingsView.as_view(), name='settings'),  # Add this
    path('streak/', StudyStreakView.as_view(), name='streak'),
]