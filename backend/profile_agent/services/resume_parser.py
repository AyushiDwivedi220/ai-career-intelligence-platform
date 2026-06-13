import pdfplumber
from profile_agent.models import SkillEvidence
from taxonomy.services import get_all_skills


def extract_pdf_text(pdf_file):

    text = ""

    with pdfplumber.open(pdf_file) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text

def extract_skills(text):

    skills_db = get_all_skills()

    found_skills = []

    text_lower = text.lower()

    for skill in skills_db:

        if skill.lower() in text_lower:
            found_skills.append(skill)

    return found_skills

def save_resume_evidence(user, skills):
    SkillEvidence.objects.filter( user= user , source= "resume").delete()

    for skill in skills:

        SkillEvidence.objects.create(
            user=user,
            skill=skill,
            source="resume",
            evidence_text=f"{skill} found in resume",
            weight=3
        )