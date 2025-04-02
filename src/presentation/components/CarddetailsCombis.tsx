import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { IRegisterVehicle } from '@/domain/entities/IVehicles';

interface VehicleDetailsCardProps {
  vehicle: IRegisterVehicle;
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicle }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      <CardMedia
        component="img"
        height="300"
        image={vehicle.image ? URL.createObjectURL(vehicle.image) : '/placeholder-image.jpg'}
        alt={`Imagen de ${vehicle.numero}`}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Número: {vehicle.numero}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Matrícula: {vehicle.matricula}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default VehicleDetailsCard;
