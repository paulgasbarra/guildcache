# Generated by Django 4.2.3 on 2024-05-02 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('s_and_j_track', '0022_student_osha_30_10_cert_alter_student_cohort'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='drivers_license',
            field=models.BooleanField(default=False),
        ),
    ]
