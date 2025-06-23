import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PlaceUseCases } from '@/domain/useCases/placeUseCases';
import { IRoute } from '@/domain/entities/IPlaces';
import { useEffect, useState } from 'react';



export default function SelectRouteComponent() {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [routes, setRoutes] = useState<IRoute[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedRoute(event.target.value as string);
  };

  useEffect(() => {
    const placeUseCase = new PlaceUseCases();

    const fetchRoutes = async () => {
      try {
        const data = await placeUseCase.getRoutes();
        setRoutes(data);
      } catch (error) {
        console.error('Error al obtener rutas:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-route-label">Ruta</InputLabel>
        <Select
          labelId="select-route-label"
          id="select-route"
          value={selectedRoute}
          label="Ruta"
          onChange={handleChange}
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
