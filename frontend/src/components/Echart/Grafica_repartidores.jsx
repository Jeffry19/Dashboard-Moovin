import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Getrepartidores from "../../services/Repartidores/Getrepartidores";
import { Box } from "@mui/material";
import KPI from "../KPI/Kipi";

const GraficoRepartidores = () => {
  const [repartidores, setRepartidores] = useState([]);

  // Obtiene los datos de los repartidores al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Getrepartidores();
        if (Array.isArray(data) && data.length > 0) {
          setRepartidores(data);
        } else {
          console.warn("No hay datos de repartidores disponibles.");
        }
      } catch (error) {
        console.error("Error al obtener repartidores", error);
      }
    };
    fetchData();
  }, []);

  if (repartidores.length === 0) {
    return <p>Cargando datos de repartidores...</p>;
  }

  // Cálculo de métricas de rendimiento
  const repartidorMasEntregas = repartidores.reduce((max, rep) => 
    (rep.total_entregas > max.total_entregas ? rep : max), repartidores[0]);

  const repartidorMasRapido = repartidores.reduce((min, rep) => 
    (rep.tiempo_promedio < min.tiempo_promedio ? rep : min), repartidores[0]);

  const repartidorMejorCalificado = repartidores.reduce((max, rep) => 
    (rep.satisfaccion_promedio > max.satisfaccion_promedio ? rep : max), repartidores[0]);

  const promedioEntregas = (repartidores.reduce((acc, rep) => acc + rep.total_entregas, 0) / repartidores.length).toFixed(1);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Rendimiento de Repartidores</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={repartidores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_entregas" fill="#8884d8" name="Total Entregas" />
          <Bar dataKey="satisfaccion_promedio" fill="#82ca9d" name="Satisfacción Promedio" />
        </BarChart>
      </ResponsiveContainer>

      {/* KPIs de desempeño */}
      <br /><br />
      <h2>Comparativa de Rendimiento entre Repartidores</h2>
      <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 2, p: 3 }}>
        <KPI title="Mayor Entregas" value={`${repartidorMasEntregas?.nombre ?? "N/A"} - ${repartidorMasEntregas?.total_entregas ?? 0} entregas`} />
        <KPI title="Entrega Más Rápida" value={`${repartidorMasRapido?.nombre ?? "N/A"} - ${repartidorMasRapido?.tiempo_promedio ?? 0} min`} />
        <KPI title="Mejor Calificación" value={`${repartidorMejorCalificado?.nombre ?? "N/A"} - ${repartidorMejorCalificado?.satisfaccion_promedio ?? 0}⭐`} />
        <KPI title="Promedio de Entregas" value={`${promedioEntregas} por repartidor`} />
      </Box>
    </div>
  );
};

export default GraficoRepartidores;
