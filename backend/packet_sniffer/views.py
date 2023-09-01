from django.shortcuts import render
from packet_sniffer.sniffer import start_sniffing

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Packet
from .serializers import PacketSerializer

class PacketList(APIView):
    permission_classes = (permissions.AllowAny,)


    def get(self, request):
        #total_packets = Packet.objects.count()
        #packets = Packet.objects.all()[total_packets - 50:]
        packets = Packet.objects.order_by('-id')[:201]
        serializer = PacketSerializer(packets, many=True)
        return Response({'paquetes': serializer.data}, status=status.HTTP_200_OK)


def packet_sniffer(request):
    if request.method == 'POST':
        start_sniffing()
        return render(request, 'packet_sniffer/sniffer.html', {'status': 'Sniffing started.'})

    return render(request, 'packet_sniffer/sniffer.html')