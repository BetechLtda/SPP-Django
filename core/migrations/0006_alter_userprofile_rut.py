# Generated by Django 4.1.6 on 2023-02-15 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_userprofile_rut_empresa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='rut',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]