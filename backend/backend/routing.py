from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path, include
from packet_sniffer.consumers import PacketConsumer


application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        URLRouter([
            path('', PacketConsumer)
        ])
    )
})