from rest_framework import generics

from .models import SkillCategory, Skill
from .serializers import (
    SkillCategorySerializer,
    SkillSerializer
)


class SkillCategoryListView(
    generics.ListAPIView
):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer


class SkillListView(
    generics.ListAPIView
):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer