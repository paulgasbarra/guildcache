from django.contrib import admin
from .models import Student, Employer, Application, Donor, Cohort, Instructor, Organization

admin.site.register(Student)
admin.site.register(Employer)
admin.site.register(Application)
admin.site.register(Donor)
admin.site.register(Cohort)
admin.site.register(Instructor)
admin.site.register(Organization)
