# Generated by Django 4.2.1 on 2023-09-01 22:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packet_sniffer', '0005_packet_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='packet',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 1, 22, 6, 18, 234666, tzinfo=datetime.timezone.utc)),
        ),
    ]
