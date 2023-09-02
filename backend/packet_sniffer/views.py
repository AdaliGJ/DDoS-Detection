from django.shortcuts import render
from packet_sniffer.sniffer import start_sniffing

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Packet
from .serializers import PacketSerializer


from django.http import JsonResponse
from django.db.models import Count
from django.db.models.functions import TruncSecond

from django.db import connection

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


def get_attack_counts(request):
    # Define the SQL query for SQLite
    sql_query = """
        WITH max_time AS (
            SELECT MAX("time") AS max_time FROM packet_sniffer_packet
        )

            SELECT
                strftime('%H:%M:%S', "time") AS second,
                classification,
                COUNT(*) AS count
            FROM
                packet_sniffer_packet, max_time
            WHERE
                "time" >= strftime('%Y-%m-%d %H:%M:%S', max_time.max_time, '-20 seconds')
            GROUP BY
                second, classification
            ORDER BY
                second;

        """

    # Execute the SQL query
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()

    # Process the query results into a dictionary
    attack_counts = {"Attack": [], "Normal": []}
    for row in rows:
        second, classification, count = row
        if classification == "Attack":
            attack_counts["Attack"].append({"second": second, "count": count})
        elif classification == "Normal":
            attack_counts["Normal"].append({"second": second, "count": count})

    return JsonResponse(attack_counts)