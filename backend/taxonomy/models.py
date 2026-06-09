from django.db import models


class SkillCategory(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    category = models.ForeignKey(
        SkillCategory,
        on_delete=models.CASCADE,
        related_name="skills"
    )

    def __str__(self):
        return self.name