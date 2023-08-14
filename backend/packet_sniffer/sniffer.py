from scapy.all import sniff
from packet_sniffer.models import Packet
import statistics

#def packet_capture_callback(packet):
    #if packet.haslayer('IP'):
        #source_ip = packet['IP'].src
        #destination_ip = packet['IP'].dst
        #protocol = packet['IP'].proto
        #packet_data = str(packet.summary())

        #packet_instance = Packet(
            #source_ip=source_ip,
            #destination_ip=destination_ip,
            #protocol=protocol,
            #packet_data=packet_data
        #)
        #packet_instance.save()

#def start_sniffing():
    #sniff(filter='ip', prn=packet_capture_callback)



# Definir variables globales para data relacionada con el flujo 
flow_start_time = None
flow_packet_lengths = []
ack_flag_count = 0
last_destination_port = None
subflow_fwd_packets = 0
init_win_bytes_forward = {}
min_seg_size_forward = {}
last_fwd_packet_time = None  # Tener el tiempo del último paquete enviado
fwd_iat_list = []  # Guardar tiempos entre llegada

def packet_capture_callback(packet):
    global flow_start_time, flow_packet_lengths, ack_flag_count, last_destination_port, subflow_fwd_packets, init_win_bytes_forward, min_seg_size_forward, last_fwd_packet_time, fwd_iat_list
    
    if packet.haslayer('IP'):
        destination_port = packet['IP'].dport if packet.haslayer('IP') else 0        
        protocol = packet['IP'].proto
        packet_length = len(packet)
        
        # Calcular duración de flujo y estadísticas longitud de paquetes
        if flow_start_time is None:
            flow_start_time = packet.time
        flow_duration = packet.time - flow_start_time
        flow_packet_lengths.append(packet_length)
        fwd_packet_length_max = max(flow_packet_lengths)
        fwd_packet_length_min = min(flow_packet_lengths)
        fwd_packet_length_std = 0.0 if len(flow_packet_lengths) <= 1 else statistics.stdev(flow_packet_lengths)
        

        flow_iat_mean = 0.0  # Default
        flow_iat_max = 0.0  # Default 
        # Calcular estadísticas de tiempo de flujo entre llegadas de paquetes
        if len(flow_packet_lengths) >= 2:
            flow_iat = packet.time - flow_start_time
            flow_iat_mean = flow_iat / len(flow_packet_lengths)
            flow_iat_max = flow_iat
        
        # Calcular estadísticas de tiempo de envío entre llegadas de paquetes
        fwd_iat_mean = statistics.mean(fwd_iat_list) if fwd_iat_list else 0.0
        fwd_iat_max = max(fwd_iat_list) if fwd_iat_list else 0.0
        fwd_iat_min = min(fwd_iat_list) if fwd_iat_list else 0.0
        
        # Calcular paquetes enviados por segundo
        fwd_packets_per_sec = len(flow_packet_lengths) / flow_duration if flow_duration > 0 else 0.0
        
        # Actualizar conteo de banderas ACK 
        if packet.haslayer('TCP') and packet['TCP'].flags & 0x10:  # Chequear si existe bandera ACK
            ack_flag_count += 1
        
        # Calcular subflow_fwd_packets basado en cambios en puerto de destino
        if last_destination_port is None or last_destination_port != destination_port:
            subflow_fwd_packets += 1
            last_destination_port = destination_port
        
        # Capturar el tamaño de la ventana inicial para la dirección hacia adelante (paquete TCP SYN)
        if packet.haslayer('TCP') and packet['TCP'].flags & 0x02:  # Chequear si existe bandera SYN
            init_win_bytes_forward[destination_port] = packet['TCP'].window
        
        # Capturar el tamaño mínimo del segmento negociado durante el handshake TCP
        if packet.haslayer('TCP') and packet['TCP'].flags & 0x02:  # Chequear bander SYN
            mss_option = None
            for option_type, option_value in packet['TCP'].options:
                if option_type == 'MSS':
                    mss_option = option_value
                    break
            
            if mss_option is not None:
                min_seg_size_forward[destination_port] = mss_option
        
        # Calcular los tiempos de envío entre llegadas
        if last_fwd_packet_time is not None:
            fwd_iat = packet.time - last_fwd_packet_time
            fwd_iat_list.append(fwd_iat)
        
        last_fwd_packet_time = packet.time
        
        # Crear y guardar instancia de paquetes
        packet_instance = Packet(
            destination_port=destination_port,
            protocol=protocol,
            flow_duration=flow_duration,
            fwd_packet_length_max=fwd_packet_length_max,
            fwd_packet_length_min=fwd_packet_length_min,
            fwd_packet_length_std=fwd_packet_length_std,
            flow_iat_mean=flow_iat_mean,
            flow_iat_max=flow_iat_max,
            fwd_iat_mean=fwd_iat_mean,
            fwd_iat_max=fwd_iat_max,
            fwd_iat_min=fwd_iat_min,
            fwd_packets_per_sec=fwd_packets_per_sec,
            ack_flag_count=ack_flag_count,
      
            min_packet_length=min(flow_packet_lengths),
            max_packet_length=max(flow_packet_lengths),
            packet_length_std = statistics.stdev(flow_packet_lengths) if len(flow_packet_lengths) >= 2 else 0.0,
            fwd_header_length_1=packet['IP'].ihl * 32,  # Longitud IP header 
            subflow_fwd_packets=subflow_fwd_packets,
            init_win_bytes_forward=init_win_bytes_forward.get(destination_port, 0),
            min_seg_size_forward=min_seg_size_forward.get(destination_port, 0),
        )
        packet_instance.save()

def start_sniffing():
    sniff(filter='ip', prn=packet_capture_callback)

# Empezar captura
#start_sniffing()
