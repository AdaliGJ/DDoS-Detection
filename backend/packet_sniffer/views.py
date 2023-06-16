from django.shortcuts import render
from packet_sniffer.sniffer import start_sniffing

def packet_sniffer(request):
    if request.method == 'POST':
        start_sniffing()
        return render(request, 'packet_sniffer/sniffer.html', {'status': 'Sniffing started.'})

    return render(request, 'packet_sniffer/sniffer.html')