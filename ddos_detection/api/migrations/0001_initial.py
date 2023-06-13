# Generated by Django 4.2.1 on 2023-05-25 02:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(default='', max_length=50, unique=True)),
                ('password', models.CharField(default='', max_length=200)),
            ],
        ),
    ]
