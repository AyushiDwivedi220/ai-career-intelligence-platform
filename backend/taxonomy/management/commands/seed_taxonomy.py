from django.core.management.base import BaseCommand

from taxonomy.models import (
    SkillCategory,
    Skill
)


class Command(BaseCommand):

    help = "Seed taxonomy data"

    def handle(self, *args, **kwargs):

        categories = {

            "Backend": [
                "Java",
                "Python",
                "Django",
                "Spring Boot"
            ],

            "Frontend": [
                "JavaScript",
                "HTML",
                "CSS",
                "React.js"
            ],

            "Database": [
                "SQL",
                "MongoDB",
                "Redis"
            ],

            "Cloud": [
                "AWS",
                "Azure"
            ],

            "DSA": [
                "Data Structures",
                "Algorithms",
                "Object Oriented Programming",
                "DBMS",
                "Operating Systems"
            ],

            "AI/ML": [
                "Artificial Intelligence",
                "Machine Learning",
                "Gemini API",
                "Face Recognition"
            ],

            "Tools": [
                "Git",
                "GitHub",
                "BitBucket",
                "VS Code"
            ],

            "API Development": [
                "REST API",
                "News API"
            ]
        }

        total_skills = 0

        for category_name, skills in categories.items():

            category, _ = (
                SkillCategory.objects.get_or_create(
                    name=category_name
                )
            )

            for skill_name in skills:

                Skill.objects.get_or_create(
                    name=skill_name,
                    defaults={
                        "category": category
                    }
                )

                total_skills += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Taxonomy seeded successfully. "
                f"Processed {total_skills} skills."
            )
        )