from django.db import models

# Create your models here.
class User(models.Model):
    user = models.CharField(max_length=50, default='', unique=True)
    password = models.CharField(max_length=200, default='', unique=False)


class Packet(models.Model):
    timestamp = models.DateTimeField()
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    # Add more fields as needed

    def __str__(self):
        return f"Packet {self.id}"