import { createTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PlaceIcon from '@mui/icons-material/Place';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const NAVIGATION: Navigation = [
  {
    segment: 'admin/transport',
    title: 'Combis',
    icon: <DirectionsCarIcon />,
  },
  {
    segment: 'admin/places',
    title: 'Paradas',
    icon: <PlaceIcon />,
  },
  {
    segment: 'admin/drivers',
    title: 'Choferes',
    icon: <AirlineSeatReclineNormalIcon />,
  },
  {
    segment: 'admin/account',
    title: 'Cuenta',
    icon: <AccountCircleIcon />,
  },
  {
    segment: 'admin/routes',
    title: 'Rutas',
    icon: <DirectionsCarIcon />,
  },
];

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

interface DemoProps {
  window?: () => Window;
}

export default function DashboardUserLayout(props: DemoProps) {
  const { window } = props;
  const demoWindow = window !== undefined ? window() : undefined;
  return (
    <ReactRouterAppProvider 
      navigation={NAVIGATION} 
      window={demoWindow}
      theme={demoTheme}
      >
      <DashboardLayout branding={{title:'Administrador',logo:''}}>
          <Outlet />
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}


