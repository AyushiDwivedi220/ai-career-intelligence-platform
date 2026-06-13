from rest_framework import serializers

class ResumeUploadSerializer(serializers.Serializer):
    resume_file = serializers.FileField()

    def validate_resume_file(self,file):

        allowed_extensions = [".pdf",".docx"]

        if not any( file.name.lower().endswith(ext) for ext in allowed_extensions):
            raise serializers.ValidationError("Only PDF and DOCX files are allowed")
        
        return file