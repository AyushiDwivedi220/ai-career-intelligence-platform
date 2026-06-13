from django.urls import path

from .views import (
    ResumeUploadAPIView,
    IntelligenceAPIView,
)

urlpatterns = [
    path(
        "upload-resume/",
        ResumeUploadAPIView.as_view(),
        name="upload-resume",
    ),
    path(
        "intelligence/",
        IntelligenceAPIView.as_view(),
        name="intelligence",
    ),
]