from .models import Skill


def map_skill_to_category(skill_name):
    skill = Skill.objects.filter(
        name__iexact=skill_name
    ).first()

    if skill:
        return skill.category.name

    return "Unknown"

def get_all_skills():
    return list(
        Skill.objects.values_list("name",flat=True) 
    )

def get_all_skills_with_categories() : 
    skills = Skill.objects.select_related("category")

    return [
        {
            "name" : skill.name ,
            "category": skill.category.name
        }
       for skill in skills

    ]