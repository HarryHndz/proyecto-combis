import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { VehicleUseCases } from '@/domain/useCases/vehiclesUseCases';
import { VehicleRepository } from '@/data/repository/VehiclesRepository'; 
import { IRegisterVehicle } from '@/domain/entities/IVehicles'; 
import { Box, CircularProgress, Typography } from '@mui/material';
import VehicleDetailsCard from '@/presentation/components/CarddetailsCombis'; 
//cambios 
const DetailsCombis = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<IRegisterVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const vehicleUseCases = useMemo(() => new VehicleUseCases(new VehicleRepository()), []);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await vehicleUseCases.getVehicleDetails(id); 
        setVehicle(data);
        setLoading(false);
      } catch {
        setError('No se pudo obtener los detalles del vehículo');
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id, vehicleUseCases]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: 2 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
      {vehicle && <VehicleDetailsCard vehicle={vehicle} />}
    </Box>
  );
};

export default DetailsCombis;
