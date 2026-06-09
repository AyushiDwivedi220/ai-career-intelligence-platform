from rest_framework import serializers
from .models import SkillCategory, Skill


class SkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    category = serializers.CharField(
        source="category.name"
    )

    class Meta:
        model = Skill
        fields = "__all__"