from collections import defaultdict

from profile_agent.models import (
    SkillEvidence,
    UserSkillConfidence
)


SOURCE_WEIGHTS = {
    "resume": 10,
    "github": 30,
    "leetcode": 20,
    "assessment": 40,
}


def calculate_skill_confidence(user):

    evidence_list = SkillEvidence.objects.filter(
        user=user
    )

    confidence_scores = defaultdict(int)

    for evidence in evidence_list:

        confidence_scores[
            evidence.skill
        ] += SOURCE_WEIGHTS.get(
            evidence.source,
            0
        )

    for skill, score in confidence_scores.items():

        UserSkillConfidence.objects.update_or_create(
            user=user,
            skill=skill,
            defaults={
                "confidence_score": min(score, 100)
            }
        )

    return confidence_scores