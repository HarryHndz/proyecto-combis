import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'; // Ícono de transporte
import { type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router-dom';
import { PageContainer } from '@toolpad/core/PageContainer';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';

const NAVIGATION: Navigation = [
  {
    segment: 'home',
    title: 'Inicioooo',
    icon: <HomeIcon />,
  },
  {
    segment: 'transport',
    title: 'Transporte',
    icon: <DirectionsBusIcon />, // Nuevo ícono agregado
  },
  {
    segment: 'account',
    title: 'Cuenta',
    icon: <AccountCircleIcon />,
  },
  {
    segment: 'logout',
    title: 'Cerrar Sesión',
    icon: <ExitToAppIcon />,
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

export default function DashboardLayoutScreen(props: DemoProps) {
  const { window } = props;
  const demoWindow = window !== undefined ? window() : undefined;
  return (
    <ReactRouterAppProvider 
      navigation={NAVIGATION} 
      window={demoWindow}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
