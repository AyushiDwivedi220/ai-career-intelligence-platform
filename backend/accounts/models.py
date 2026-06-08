from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    target_role = models.CharField(
        max_length=255,
        blank=True
    )

    target_companies = models.JSONField(
        default=list,
        blank=True
    )

    timeline_months = models.IntegerField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.username