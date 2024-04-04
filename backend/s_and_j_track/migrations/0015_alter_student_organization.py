# Generated by Django 4.2.3 on 2024-04-04 01:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('s_and_j_track', '0014_student_organization'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='organization',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='s_and_j_track.organization'),
        ),
    ]
