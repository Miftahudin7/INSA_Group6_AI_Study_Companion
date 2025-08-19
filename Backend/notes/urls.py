from django.urls import path
from .views import FileUploadView, GetUserFilesView, GetCommonBooksView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('files/', GetUserFilesView.as_view(), name='user-files'),
    path('common-books/', GetCommonBooksView.as_view(), name='common-books'),
]
