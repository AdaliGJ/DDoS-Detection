from scapy.all import sniff
from packet_sniffer.models import Packet

def packet_capture_callback(packet):
    if packet.haslayer('IP'):
        source_ip = packet['IP'].src
        destination_ip = packet['IP'].dst
        protocol = packet['IP'].proto
        packet_data = str(packet.summary())

        packet_instance = Packet(
            source_ip=source_ip,
            destination_ip=destination_ip,
            protocol=protocol,
            packet_data=packet_data
        )
        packet_instance.save()

def start_sniffing():
    sniff(filter='ip', prn=packet_capture_callback)
