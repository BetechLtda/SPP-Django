# Generated by Django 4.1.6 on 2023-03-03 14:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0030_productocorte'),
    ]

    operations = [
        migrations.CreateModel(
            name='TiempoCambio',
            fields=[
                ('id_tiempo_cambio', models.AutoField(primary_key=True, serialize=False)),
                ('valor', models.FloatField(blank=True, null=True)),
                ('usuario_crea', models.CharField(blank=True, db_collation='SQL_Latin1_General_CP1_CI_AS', max_length=20, null=True)),
                ('fecha_crea', models.DateField(blank=True, null=True)),
                ('id_linea', models.ForeignKey(blank=True, db_column='id_linea', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.linea')),
            ],
            options={
                'db_table': 'TIEMPO_CAMBIO',
            },
        ),
    ]