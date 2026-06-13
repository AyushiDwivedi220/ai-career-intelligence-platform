from django.db import models
from accounts.models import User


class UserSkillScore(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    skill_category = models.CharField(
        max_length=100
    )

    score = models.IntegerField(
        default=0
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.skill_category}: "
            f"{self.score}"
        )

class UserSkillConfidence(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    skill = models.CharField(
        max_length=100
    )

    confidence_score = models.FloatField(
        default=0
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        unique_together = (
            "user",
            "skill"
        )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.skill}: "
            f"{self.confidence_score}"
        )

class SkillEvidence(models.Model):
    user = models.ForeignKey(User,on_delete= models.CASCADE)
    skill = models.CharField(max_length=100)
    source = models.CharField(max_length = 50)
    evidence_text = models.TextField()
    weight = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.skill} ({self.source})"

class UserResume(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    resume_file = models.FileField(
        upload_to="resumes/"
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.resume_file.name}"
        )