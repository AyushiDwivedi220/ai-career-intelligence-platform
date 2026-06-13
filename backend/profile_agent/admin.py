from django.contrib import admin

from .models import (
    UserSkillScore,
    SkillEvidence,
    UserResume,
    UserSkillConfidence
)

admin.site.register(UserSkillScore)
admin.site.register(SkillEvidence)
admin.site.register(UserResume)
admin.site.register(UserSkillConfidence)