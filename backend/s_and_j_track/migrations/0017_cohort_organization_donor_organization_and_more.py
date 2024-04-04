# Generated by Django 4.2.3 on 2024-04-04 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('s_and_j_track', '0016_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='cohort',
            name='organization',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='cohorts', to='s_and_j_track.organization'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='donor',
            name='organization',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='donors', to='s_and_j_track.organization'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employer',
            name='organization',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='employers', to='s_and_j_track.organization'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='instructor',
            name='organization',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='instructors', to='s_and_j_track.organization'),
            preserve_default=False,
        ),
    ]
