# Generated by Django 2.1.5 on 2019-01-13 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sequence',
            name='sequence',
            field=models.CharField(max_length=25000),
        ),
    ]
