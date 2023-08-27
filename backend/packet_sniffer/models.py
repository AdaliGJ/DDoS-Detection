from django.db import models
from django.utils import timezone


# Create your models here.
#class Packet(models.Model):
    #source_ip = models.CharField(max_length=50)
    #destination_ip = models.CharField(max_length=50)
    #protocol = models.CharField(max_length=10)
    #packet_data = models.TextField()
    #capture_time = models.DateTimeField(auto_now_add=True)

    #def __str__(self):
        #return f'{self.source_ip} -> {self.destination_ip} ({self.protocol})'



class Packet(models.Model):
    destination_port = models.IntegerField(default=0)
    protocol = models.CharField(max_length=10, default='')
    flow_duration = models.FloatField(default=0.0)
    fwd_packet_length_max = models.FloatField(default=0.0)
    fwd_packet_length_min = models.FloatField(default=0.0)
    fwd_packet_length_std = models.FloatField(default=0.0)
    flow_iat_mean = models.FloatField(default=0.0)
    flow_iat_max = models.FloatField(default=0.0)
    fwd_iat_mean = models.FloatField(default=0.0)
    fwd_iat_max = models.FloatField(default=0.0)
    fwd_iat_min = models.FloatField(default=0.0)
    fwd_header_length = models.IntegerField(default=0)
    fwd_packets_per_sec = models.FloatField(default=0.0)
    min_packet_length = models.FloatField(default=0.0)
    max_packet_length = models.FloatField(default=0.0)
    packet_length_std = models.FloatField(default=0.0)
    ack_flag_count = models.IntegerField(default=0)
    average_packet_size = models.FloatField(default=0.0)
    fwd_header_length_1 = models.IntegerField(default=0)
    subflow_fwd_packets = models.IntegerField(default=0)
    init_win_bytes_forward = models.IntegerField(default=0)
    min_seg_size_forward = models.IntegerField(default=0)
    classification = models.CharField(max_length=50,default='')

    def __str__(self):
        return f'Destination Port: {self.destination_port}, Protocol: {self.protocol}'

