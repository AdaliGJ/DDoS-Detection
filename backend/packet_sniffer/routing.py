# routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from . import consumers

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path("ws/real_time_sniff/", consumers.YourConsumer.as_asgi()),
    ]),
})
