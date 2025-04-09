import { Box, InputLabel, MenuItem, FormControl, Select, CircularProgress, SelectChangeEvent } from '@mui/material';
import { PlaceUseCases } from '@/domain/useCases/placeUseCases';
import { IRoute } from '@/domain/entities/IPlaces';
import { useEffect, useState } from 'react';

// El tipo para el cambio de evento lo cambiamos a React.ChangeEvent
interface EditRouteComponentProps {
  selectedRoute: string;  // Ruta seleccionada que se editará
  onRouteChange: (newRouteId: string) => void; // Función que se llamará al cambiar la ruta
}

export default function EditRouteComponent({ selectedRoute, onRouteChange }: EditRouteComponentProps) {
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Modificamos el tipo de evento a React.ChangeEvent
  const handleRouteChange = (event: SelectChangeEvent<string>) => {
    onRouteChange(event.target.value); // El valor ya es de tipo string
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      const placeUseCase = new PlaceUseCases();
      try {
        const data = await placeUseCase.getRoutes();
        setRoutes(data);
      } catch (error) {
        console.error('Error al obtener rutas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-route-label">Ruta</InputLabel>
        <Select
          labelId="select-route-label"
          id="select-route"
          value={selectedRoute}
          onChange={handleRouteChange}
          label="Ruta"
        >
          {routes.map((route) => (
            <MenuItem key={route.id} value={route.id}>
              {route.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
