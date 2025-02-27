import { Card, CardContent, Typography } from '@mui/material';

// Componente KPI: Muestra una tarjeta con un título y un valor destacado.
function KPI({ title, value }) {
  return (
    <Card 
      sx={{ 
        minWidth: 200,  // Establece un ancho mínimo para la tarjeta
        margin: 1,      // Margen para separación entre tarjetas
        textAlign: 'center', // Centra el contenido
        boxShadow: 3    // Agrega sombra para mejor visualización
      }}
    >
      <CardContent>
        {/* Muestra el título del KPI en un texto secundario */}
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        {/* Muestra el valor del KPI en un tamaño grande y color azul */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default KPI;
