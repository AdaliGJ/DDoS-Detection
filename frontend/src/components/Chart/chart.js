import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import { CategoryScale, LinearScale, TimeScale, Chart, Title, Tooltip, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, TimeScale, Title, Tooltip, PointElement, LineElement);

function TrafficChart() {
  const [paquetesAttack, setPaquetesAttack] = useState([]);
  const [paquetesNormal, setPaquetesNormal] = useState([]);

  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

  const fetchPackets = async () => {
    try {
      const response = await client.get('/packets/get_attack_counts/');
      if (response.data) {
        setPaquetesAttack(response.data.Attack);
        setPaquetesNormal(response.data.Normal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startLongPolling = async () => {
    while (true) {
      await fetchPackets();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  useEffect(() => {
    startLongPolling();
  }, []);

  const chartData = {
    labels: paquetesAttack.map((entry) => entry.second),
    datasets: [
      {
        label: 'Attacks',
        data: paquetesAttack.map((entry) => entry.count),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Normal',
        data: paquetesNormal.map((entry) => entry.count),
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Clasificación de Tráfico',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Paquetes',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="packet-container">
      <Line data={chartData} options={chartOptions}  style={{ width: '100%', height: '38vh', margin: 'auto' }} />
    </div>
  );
}

export default TrafficChart;
