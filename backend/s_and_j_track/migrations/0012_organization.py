# Generated by Django 4.2.3 on 2024-04-04 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('s_and_j_track', '0011_alter_instructor_email_alter_student_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('linkedin', models.URLField()),
                ('website', models.URLField()),
            ],
        ),
    ]
