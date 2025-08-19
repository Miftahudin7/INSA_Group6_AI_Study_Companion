from django.urls import path
from .views import MyTokenObtainPairView, MyTokenRefreshView, RegisterView, LogoutView, UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # Keep only JWT endpoints under core.urls to avoid duplication/confusion
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]