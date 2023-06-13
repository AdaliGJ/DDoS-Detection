from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .models import User
from .models import Packet
from scapy.all import sniff
import threading

import pyshark

# Create your views here.
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def packet_capture_thread(packets):
    captured_packets = sniff(count=10)  # Capture 10 packets
    for packet in captured_packets:
        pkt = Packet(
            timestamp=str(packet.time),  # Convert to string
            source=packet.src,
            destination=packet.dst,
            # Set other fields accordingly
        )
        pkt.save()
        packets.append(pkt)

def capture_packets(request):
    packets = []

    capture_thread = threading.Thread(target=packet_capture_thread, args=(packets,))
    capture_thread.start()

    context = {
        'packets': packets
    }
    return render(request, 'packet_capture.html', context)