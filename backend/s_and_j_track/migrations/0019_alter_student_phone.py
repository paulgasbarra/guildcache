# Generated by Django 4.2.3 on 2024-04-05 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('s_and_j_track', '0018_remove_student_class_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='phone',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
