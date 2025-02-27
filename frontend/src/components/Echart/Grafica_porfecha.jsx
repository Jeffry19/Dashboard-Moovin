import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import GetClientes from "../../services/Clientes/Get";

export default function ClientesPorMesChart() {
  const [clientesPorMes, setClientesPorMes] = useState({});

  useEffect(() => {
    async function fetchClientes() {
      try {
        const clientes = await GetClientes();

        // Agrupar clientes por mes
        const clientesPorMesData = clientes.reduce((acc, cliente) => {
          const mes = new Date(cliente.fecha_registro).toLocaleString("es-ES", {
            month: "long",
            year: "numeric",
          });

          acc[mes] = (acc[mes] || 0) + 1;
          return acc;
        }, {});

        setClientesPorMes(clientesPorMesData);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    }

    fetchClientes();
  }, []);

  // Configuración de ECharts
  const options = {
    title: {
      text: "Clientes Registrados por Mes",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Clientes"],
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: Object.keys(clientesPorMes), // Meses en el eje X
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Clientes",
        type: "bar",
        data: Object.values(clientesPorMes), // Cantidad de clientes por mes
        itemStyle: {
          color: "#4CAF50",
        },
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
    </div>
  );
}

