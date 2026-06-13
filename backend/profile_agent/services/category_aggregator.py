from collections import defaultdict

from profile_agent.models import (
    UserSkillConfidence,
    UserSkillScore
)

from taxonomy.services import (
    map_skill_to_category
)


def calculate_category_scores(user):

    confidence_list = UserSkillConfidence.objects.filter(
        user=user
    )

    category_totals = defaultdict(list)

    for confidence in confidence_list:

        category = map_skill_to_category(
            confidence.skill
        )

        if category:

            category_totals[
                category
            ].append(
                confidence.confidence_score
            )

    for category, scores in category_totals.items():

        average_score = sum(scores) / len(scores)

        UserSkillScore.objects.update_or_create(
            user=user,
            skill_category=category,
            defaults={
                "score": round(average_score)
            }
        )