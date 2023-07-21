from django.contrib import admin
from .models import Student, Employer, Application, Donor

admin.site.register(Student)
admin.site.register(Employer)
admin.site.register(Application)
admin.site.register(Donor)

