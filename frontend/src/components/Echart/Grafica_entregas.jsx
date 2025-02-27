import React, { useState, useEffect } from 'react';
import ReactECharts from "echarts-for-react";
import GetClientes from '../../services/Clientes/Get';// Importa la función correctamente

const GraficaEntregas = () => {
  const [clientes, setClientes] = useState([]);
  const [entregadas, setEntregadas] = useState(0);
  const [enCurso, setEnCurso] = useState(0);
  const [fallidas, setFallidas] = useState(0);

  // Función para obtener clientes desde la API
  useEffect(() => {
    const fetchClientes = async () => {
      const data = await GetClientes();
      console.log("Datos de clientes recibidos:", data);
      setClientes(data);
    };

    fetchClientes();
  }, []);

  // Procesar entregas cuando clientes cambia
  useEffect(() => {
    if (!clientes || clientes.length === 0) {
      console.log("No hay datos de clientes disponibles");
      return;
    }
    procesarEntregas(clientes);
  }, [clientes]);

  const procesarEntregas = (clientes) => {
    let entregadasCount = 0;
    let enCursoCount = 0;
    let fallidasCount = 0;

    clientes.forEach(cliente => {
      if (cliente.entregas && cliente.entregas.length > 0) {
        cliente.entregas.forEach(entrega => {
          if (entrega.estado === 'Entregado') {
            entregadasCount++;
          } else if (entrega.estado === 'En curso') {
            enCursoCount++;
          } else if (entrega.estado === 'Fallida' || entrega.estado === 'No Entregada') {
            fallidasCount++;
          }
        });
      }
    });

    console.log('Entregadas:', entregadasCount, 'En Curso:', enCursoCount, 'Fallidas:', fallidasCount);

    setEntregadas(entregadasCount);
    setEnCurso(enCursoCount);
    setFallidas(fallidasCount);
  };

  const obtenerGraficoOptions = () => {
    return {
      title: {
        text: 'Estado de las Entregas',
        subtext: `Efectividad: ${entregadas + enCurso + fallidas > 0 ? ((entregadas / (entregadas + enCurso + fallidas)) * 100).toFixed(2) + '%' : 'N/A'}`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Estado de Entrega',
          type: 'pie',
          radius: '50%',
          data: [
            { value: entregadas, name: 'Entregadas' },
            { value: enCurso, name: 'En Curso' },
            { value: fallidas, name: 'Fallidas' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };

  return (
    <div>
      <h2>Gráfico de Entregas</h2>
      <ReactECharts
        option={obtenerGraficoOptions()}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default GraficaEntregas;
