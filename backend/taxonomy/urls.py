from django.urls import path

from .views import (
    SkillCategoryListView,
    SkillListView
)

urlpatterns = [
    path(
        "categories/",
        SkillCategoryListView.as_view()
    ),

    path(
        "skills/",
        SkillListView.as_view()
    ),
]