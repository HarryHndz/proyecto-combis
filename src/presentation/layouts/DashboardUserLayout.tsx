import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router-dom';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';

const NAVIGATION: Navigation = [
  {
    segment: 'user/home',
    title: 'Inicioooo',
    icon: <HomeIcon />,
  },
  {
    segment: 'user/account',
    title: 'Cuenta',
    icon: <AccountCircleIcon />,
  },
  {
    segment: 'user/profile',
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

export default function DashboardUserLayout(props: DemoProps) {
  const { window } = props;
  const demoWindow = window !== undefined ? window() : undefined;
  return (
    <ReactRouterAppProvider 
      navigation={NAVIGATION} 
      window={demoWindow}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}
