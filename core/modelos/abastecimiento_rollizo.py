# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AbastecimientoRollizo(models.Model):
    id_abastecimiento = models.AutoField(primary_key=True)
    id_rollizo = models.ForeignKey('Rollizo', models.DO_NOTHING, db_column='id_rollizo', verbose_name='Rollizo', blank=True, null=True)
    id_periodo = models.ForeignKey('Periodo', models.DO_NOTHING, db_column='id_periodo', verbose_name='Periodo', blank=True, null=True)
    numero_bloque = models.IntegerField(blank=True, null=True)
    cantidad_hh = models.IntegerField(blank=True, null=True)
    usuario_crea = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=True, null=True)
    fecha_crea = models.DateField(auto_now_add=True, blank=True, null=True)

    class Meta:
        db_table = 'ABASTECIMIENTO_ROLLIZO'
        ordering = ['id_abastecimiento']
        
    def __str__(self):
        return str(self.id_abastecimiento)
