from .models import Skill


def map_skill_to_category(skill_name):
    skill = Skill.objects.filter(
        name__iexact=skill_name
    ).first()

    if skill:
        return skill.category.name

    return "Unknown"