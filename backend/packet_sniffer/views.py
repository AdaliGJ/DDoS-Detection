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
            SUM(CASE WHEN classification = 'Attack' THEN 1 ELSE 0 END) AS attack_count,
            SUM(CASE WHEN classification = 'Normal' THEN 1 ELSE 0 END) AS normal_count
        FROM
            packet_sniffer_packet, max_time
        WHERE
            "time" >= strftime('%Y-%m-%d %H:%M:%S', max_time.max_time, '-20 seconds')
        GROUP BY
            second
        ORDER BY
            second;
    """

    # Execute the SQL query
    with connection.cursor() as cursor:
        cursor.execute(sql_query)
        rows = cursor.fetchall()

    # Process the query results into a list of dictionaries
    attack_counts = []
    for row in rows:
        second, attack_count, normal_count = row
        attack_counts.append({"second": second, "attackCount": attack_count, "normalCount": normal_count})

    return JsonResponse(attack_counts, safe=False)