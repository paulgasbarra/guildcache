from django.db import models
from django.conf import settings

class Organization(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    linkedin = models.URLField()
    website = models.URLField()

    def __str__(self):
        return self.name
    
class UserProfile(models.Model):  
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='users')

    def __str__(self):
        return self.user.username

class Employer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    website = models.URLField()
    primary_contact = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    linkedin = models.URLField()
    job_listings = models.URLField()
    company_size = models.IntegerField()
    speciality = models.CharField(max_length=200)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='employers')

    def __str__(self):
        return self.name

class Donor(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    linkedin = models.URLField()
    website = models.URLField()
    instagram = models.URLField()
    tiktok = models.URLField()
    notes = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='donors')


    def __str__(self):
        return self.name
    
class Cohort(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=200)
    instructors = models.ManyToManyField('Instructor', related_name='cohorts')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='cohorts')

    def __str__(self):
        return self.name
    
class Student(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(unique=True)
    linkedin = models.URLField(blank=True)
    resume_link = models.URLField(blank=True)
    lca_cert = models.BooleanField(default=False)
    epa_608_cert = models.BooleanField(default=False)
    s_j_cert = models.BooleanField(default=False)
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, related_name='students', blank=True, null=True)
    notes = models.TextField(blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='students')
    hired = models.BooleanField(default=False)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(unique=True)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE, related_name='contacts', null=True, blank=True)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='contacts', null=True, blank=True)
    is_primary = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_primary:
            # Ensure no other contact is marked as primary for the organization
            Contact.objects.filter(
                donor=self.donor,
                employer=self.employer,
                is_primary=True
            ).update(is_primary=False)
        super().save(*args, **kwargs)

class Instructor(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    linkedin = models.URLField()
    website = models.URLField()
    instagram = models.URLField()
    tiktok = models.URLField()
    salary = models.DecimalField(max_digits=9, decimal_places=2)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='instructors')

    def __str__(self):
        return self.name
    
class Application(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    applied_date = models.DateField()
    passed_date = models.DateField(null=True, blank=True)
    hired_date = models.DateField(null=True, blank=True)
    salary_or_hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f'{self.student.name} -> {self.employer.name}'