# Generated by Django 4.1.6 on 2023-03-03 13:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0027_rollizolargo_patroncorte'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='rollizolargo',
            options={},
        ),
        migrations.CreateModel(
            name='Rollizo',
            fields=[
                ('id_rollizo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_rollizo', models.CharField(blank=True, db_collation='SQL_Latin1_General_CP1_CI_AS', max_length=300, null=True)),
                ('descripcion_rollizo', models.CharField(blank=True, db_collation='SQL_Latin1_General_CP1_CI_AS', max_length=500, null=True)),
                ('diametro', models.IntegerField(blank=True, null=True)),
                ('usuario_crea', models.CharField(blank=True, db_collation='SQL_Latin1_General_CP1_CI_AS', max_length=20, null=True)),
                ('fecha_crea', models.DateField(blank=True, null=True)),
                ('id_patron', models.IntegerField(blank=True, null=True)),
                ('clase_diametrica', models.IntegerField(blank=True, null=True)),
                ('id_largo', models.ForeignKey(blank=True, db_column='id_largo', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.rollizolargo')),
                ('id_linea', models.ForeignKey(blank=True, db_column='id_linea', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.linea')),
            ],
            options={
                'db_table': 'ROLLIZO',
            },
        ),
    ]
