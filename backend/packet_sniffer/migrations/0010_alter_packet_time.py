# Generated by Django 4.2.1 on 2023-09-02 05:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packet_sniffer', '0009_alter_packet_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='packet',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 2, 5, 5, 44, 171099, tzinfo=datetime.timezone.utc)),
        ),
    ]
