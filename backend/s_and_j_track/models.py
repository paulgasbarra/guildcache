from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    linkedin = models.URLField()
    website = models.URLField()

    def __str__(self):
        return self.name

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

    def __str__(self):
        return self.name
    
class Cohort(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=200)
    instructors = models.ManyToManyField('Instructor', related_name='cohorts')

    def __str__(self):
        return self.name
    
class Student(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    linkedin = models.URLField()
    resume_link = models.URLField()
    lca_cert = models.BooleanField(default=False)
    epa_608_cert = models.BooleanField(default=False)
    s_j_cert = models.BooleanField(default=False)
    class_site = models.CharField(max_length=200)
    class_number = models.IntegerField()
    class_date = models.DateField()
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, related_name='students')
    notes = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='students')
   
   

    def __str__(self):
        return self.name

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