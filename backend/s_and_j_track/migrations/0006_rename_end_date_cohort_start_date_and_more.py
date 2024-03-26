# Generated by Django 4.2.3 on 2024-03-25 21:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('s_and_j_track', '0005_remove_cohort_instructors_remove_cohort_students_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cohort',
            old_name='end_date',
            new_name='start_date',
        ),
        migrations.AlterField(
            model_name='student',
            name='cohort',
            field=models.ForeignKey(null = True, on_delete=django.db.models.deletion.CASCADE, related_name='students', to='s_and_j_track.cohort'),
        ),
    ]
