# Generated by Django 4.1.6 on 2023-03-03 13:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0025_calidadproducto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='rut_empresa',
        ),
        migrations.AddField(
            model_name='producto',
            name='id_tipo_calidad',
            field=models.ForeignKey(blank=True, db_column='id_tipo_calidad', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.calidadproducto'),
        ),
    ]
