from django.urls import path
from packet_sniffer.views import packet_sniffer
from .views import PacketList


urlpatterns = [
    path('sniffer/', packet_sniffer, name='packet_sniffer'),
    path('all', PacketList.as_view())
]