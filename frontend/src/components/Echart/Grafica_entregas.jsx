import React, { useState, useEffect } from 'react';
import ReactECharts from "echarts-for-react";
import GetClientes from '../../services/Clientes/Get'; // Importación del servicio para obtener clientes

const GraficaEntregas = () => {
  const [clientes, setClientes] = useState([]);
  const [entregadas, setEntregadas] = useState(0);
  const [enCurso, setEnCurso] = useState(0);
  const [fallidas, setFallidas] = useState(0);

  // Obtiene los clientes desde la API al montar el componente
  useEffect(() => {
    const fetchClientes = async () => {
      const data = await GetClientes();
      setClientes(data);
    };
    fetchClientes();
  }, []);

  // Procesa las entregas cuando se actualizan los clientes
  useEffect(() => {
    if (clientes.length > 0) {
      procesarEntregas(clientes);
    }
  }, [clientes]);

  // Cuenta las entregas según su estado
  const procesarEntregas = (clientes) => {
    let entregadasCount = 0, enCursoCount = 0, fallidasCount = 0;

    clientes.forEach(cliente => {
      cliente.entregas?.forEach(entrega => {
        if (entrega.estado === 'Entregado') entregadasCount++;
        else if (entrega.estado === 'En curso') enCursoCount++;
        else if (['Fallida', 'No Entregada'].includes(entrega.estado)) fallidasCount++;
      });
    });

    setEntregadas(entregadasCount);
    setEnCurso(enCursoCount);
    setFallidas(fallidasCount);
  };

  // Configuración del gráfico
  const obtenerGraficoOptions = () => ({
    title: {
      text: 'Estado de las Entregas',
      subtext: `Efectividad: ${entregadas + enCurso + fallidas > 0 ? 
        ((entregadas / (entregadas + enCurso + fallidas)) * 100).toFixed(2) + '%' : 'N/A'}`,
      left: 'center'
    },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [{
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
    }]
  });

  return (
    <div>
      <h2>Gráfico de Entregas</h2>
      <ReactECharts option={obtenerGraficoOptions()} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default GraficaEntregas;
