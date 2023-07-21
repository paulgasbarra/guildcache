from django.core.management.base import BaseCommand
from faker import Faker
from s_and_j_track.models import Student, Employer, Application, Donor

class Command(BaseCommand):
    help = 'Create random users'

    def handle(self, *args, **kwargs):
        fake = Faker()
        for _ in range(10):  # Create 100 instances of each model
            student_name = fake.name()
            Student.objects.create(
                name=student_name,
                address=fake.address(),
                phone=fake.phone_number(),
                email=fake.email(),
                linkedin="https://www.linkedin.com/in/" + student_name.replace(" ", "-"),
                resume_link="https://www.linkedin.com/in/" + student_name.replace(" ", "-") + "/resume",
                lca_cert=fake.boolean(),
                epa_608_cert=fake.boolean(),
                s_j_cert=fake.boolean(),
                class_site=fake.address(),
                class_number=fake.random_int(min=1, max=20),
                class_date=fake.date_between(start_date='-5y', end_date='today'),
            )
            company = fake.company()
            primary_contact = fake.name()
            Employer.objects.create(
                name=company,
                address=fake.address(),
                website="https://www." + company.replace(" ", "") + ".com",
                primary_contact=primary_contact,
                phone=fake.phone_number(),
                email=primary_contact.replace(" ", "") + "@" + company.replace(" ", "") + ".com",   
                linkedin="https://www.linkedin.com/in/" + company.replace(" ", "-"),
                job_listings="https://www." + company.replace(" ", "") + ".com/jobs",
                company_size=fake.random_element(elements = [10, 25, 50, 100, 250, 500, 1000, 5000, 10000]),
                speciality=fake.random_element(elements = ["HVAC", "Electrical", "Plumbing", "Carpentry", "Welding", "Masonry", "Solar", "Other"]),
            )
            donor_name = fake.random_element(elements = [fake.company(), fake.name()])
            Donor.objects.create(
                name=donor_name,
                address=fake.address(),
                phone=fake.phone_number(),
                email=fake.email(),
                linkedin="https://www.linkedin.com/in/" + donor_name.replace(" ", "-"),
                website="https://www." + donor_name.replace(" ", "") + ".com",
                instagram="https://www.instagram.com/" + donor_name.replace(" ", ""),
                tiktok="https://www.tiktok.com/@" + donor_name,
            )
        
        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
