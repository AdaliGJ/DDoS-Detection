from django.urls import path
from packet_sniffer.views import packet_sniffer
from packet_sniffer.sniffer import start_packet_capture, stop_packet_capture
from .views import PacketList


urlpatterns = [
    path('sniffer/', packet_sniffer, name='packet_sniffer'),
    path('all', PacketList.as_view()),
    path('start-capture/', start_packet_capture, name='start_packet_capture'),
    path('stop-capture/', stop_packet_capture, name='stop_packet_capture')
]