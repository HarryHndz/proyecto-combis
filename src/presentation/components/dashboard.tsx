import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import MapCard from '@/presentation/components/CardDashboard';  // Importamos el componente MapCard

const NAVIGATION: Navigation = [
  {
    segment: 'home',
    title: 'Inicio',
    icon: <HomeIcon />,
  },
  {
    segment: 'logout',
    title: 'Cerrar Sesión',
    icon: <ExitToAppIcon />,
  },
  {
    segment: 'account',
    title: 'Cuenta',
    icon: <AccountCircleIcon />,
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

export default function DashboardLayoutFullScreen(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter('/home'); // Redirige a "Inicio" por defecto

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {/* Contenedor con el mapa */}
        <div style={{ position: 'relative', height: '100vh' }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-93.2146422!3d17.9794344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d32e8b1b4ef77b%3A0xc76ed3b6d5042a97!2sTabasco!5e0!3m2!1ses!2smx!4v1676187192837!5m2!1ses!2smx"
            style={{ width: '100%', height: '100%', border: 0 }}
            allowFullScreen
            loading="lazy"
          />
          
          {/* Usamos el componente MapCard */}
          <MapCard />
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
