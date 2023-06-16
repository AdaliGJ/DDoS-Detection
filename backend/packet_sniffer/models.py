from django.db import models

# Create your models here.
class Packet(models.Model):
    source_ip = models.CharField(max_length=50)
    destination_ip = models.CharField(max_length=50)
    protocol = models.CharField(max_length=10)
    packet_data = models.TextField()
    capture_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.source_ip} -> {self.destination_ip} ({self.protocol})'