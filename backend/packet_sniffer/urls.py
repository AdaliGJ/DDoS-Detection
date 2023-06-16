from django.urls import path
from packet_sniffer.views import packet_sniffer

urlpatterns = [
    path('sniffer/', packet_sniffer, name='packet_sniffer'),
]