# Generated by Django 4.2.3 on 2024-04-04 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('s_and_j_track', '0012_organization'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
