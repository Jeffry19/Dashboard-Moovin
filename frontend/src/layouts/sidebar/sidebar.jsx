// Importaciones necesarias para Material UI y Toolpad
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

// Importación de componentes personalizados
import Phome from '../../pages/Phome/Phome'; // No parece estar en uso dentro del código actual
import DataTable from '../../components/Table/Table';
import ClientesPorMesChart from '../../components/Echart/Grafica_porfecha';
import GraficoEntregas from '../../components/Echart/Grafica_entregas';
import GraficoRepartidores from '../../components/Echart/Grafica_repartidores';

// Definir la navegación del dashboard
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Elementos Principales',
  },
  {
    segment: 'entregas',
    title: 'Entregas',
    icon: <ShoppingCartIcon />, // Ícono para la navegación de entregas
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Análisis',
  },
  {
    segment: 'informes',
    title: 'Informes',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'rendimiento-repartidores',
        title: 'Rendimiento de Repartidores',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'clientes',
    title: 'Clientes',
    icon: <LayersIcon />,
  },
];

// Definir el tema personalizado para el dashboard
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Componente que muestra el contenido dinámico según la ruta seleccionada
function DashboardContent({ pathname }) {
  console.log("Ruta actual:", pathname);

  return (
    <Box
      sx={{
        py: 4,
        px: 3,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {/* Sección de clientes */}
      {pathname === '/clientes' ? (
        <>
          <div>
            <DataTable />
            <br /><br />
            <div>
              <ClientesPorMesChart />
            </div>
          </div>
        </>
      ) : null}

      {/* Sección de entregas */}
      {pathname === '/entregas' ? (
        <>
          <GraficoEntregas />
        </>
      ) : null}

      {/* Sección de rendimiento de repartidores */}
      {pathname === '/informes/rendimiento-repartidores' ? (
        <>
          <GraficoRepartidores />
        </>
      ) : null}
    </Box>
  );
}

// Validación de tipos para el prop `pathname`
DashboardContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Componente principal del layout del dashboard
function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/entregas'); // Define la ruta inicial como "/entregas"
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src='https://www.moovin.me/wp-content/uploads/elementor/thumbs/logotipo-p0w942n4ng4q5m2y5cjvsoaf8c2dq0y637cw4b34lm.png' alt="Logo Moovin" />,
        title: "",
        homeUrl: '/entregas',
      }}
    >
      <DashboardLayout>
        <DashboardContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

// Validación de tipos para el prop `window`
DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
