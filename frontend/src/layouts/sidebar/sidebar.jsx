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
import Phome from '../../pages/Phome/Phome';

// Definir la navegación
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Elementos Principales',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'entregas',
    title: 'Entregas',
    icon: <ShoppingCartIcon />,
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
      {
        segment: 'eficiencia-rutas',
        title: 'Eficiencia de Rutas',
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

// Definir el tema
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

function DashboardContent({ pathname }) {
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
      {/* Renderizar contenido dinámico solo si está en /dashboard */}
      {pathname === '/dashboard' ? (
        <Phome />
      ) : (
        <Typography variant="h5" sx={{ mb: 2 }}>
          {`Sección: ${pathname}`}
        </Typography>
      )}
    </Box>
  );
}

DashboardContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: null,
        title: 'Mi Dashboard Personalizado',
        homeUrl: '/dashboard',
      }}
    >
      <DashboardLayout>
        <DashboardContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
