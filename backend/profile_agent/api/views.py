from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ResumeUploadSerializer

from profile_agent.models import (
    UserResume,
    UserSkillConfidence,
    UserSkillScore,
)

from profile_agent.services.resume_parser import (
    extract_pdf_text,
    extract_skills,
    save_resume_evidence,
)

from profile_agent.services.validation_agent import (
    calculate_skill_confidence,
)

from profile_agent.services.category_aggregator import (
    calculate_category_scores,
)


class ResumeUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ResumeUploadSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        resume_file = serializer.validated_data[
            "resume_file"
        ]

        UserResume.objects.update_or_create(
            user=request.user,
            defaults={
                "resume_file": resume_file,
            },
        )

        text = extract_pdf_text(resume_file)

        print("\n========== RESUME TEXT ==========")
        print(text)

        skills = extract_skills(text)

        print("\n========== SKILLS ==========")
        print(skills)

        save_resume_evidence(
            request.user,
            skills,
        )

        calculate_skill_confidence(
            request.user
        )

        calculate_category_scores(
            request.user
        )

        return Response(
            {
                "message": "Resume uploaded successfully",
                "skills": skills,
            },
            status=status.HTTP_200_OK,
        )


class IntelligenceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        skills = UserSkillConfidence.objects.filter(
            user=request.user
        )

        categories = UserSkillScore.objects.filter(
            user=request.user
        )

        return Response(
            {
                "skills": [
                    {
                        "skill": skill.skill,
                        "confidence": skill.confidence_score,
                    }
                    for skill in skills
                ],
                "categories": [
                    {
                        "category": category.skill_category,
                        "score": category.score,
                    }
                    for category in categories
                ],
            }
        )