import { Box, CircularProgress, Typography, Button, Grid, Paper, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useVehiclesData from '@/presentation/hooks/useVehiclesData';
import EditRouteComponent from '@/presentation/components/selectupdate';  // Asegúrate de importar el componente

const DetailsCombis = () => {
  const { id } = useParams();
  const { getVehicleDetails, updateVehicle, loading, error } = useVehiclesData();
  const [vehicle, setVehicle] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    numero: '',
    matricula: '',
    id_ruta: '',
  });

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!id) return;

      try {
        const data = await getVehicleDetails(id);
        setVehicle(data || null);
        if (data) {
          setFormData({
            numero: data.numero || '',
            matricula: data.matricula || '',
            id_ruta: data.id_ruta || '',
          });
        }
      } catch {
        setVehicle(null);
      }
    };

    fetchVehicleDetails();
  }, [id, getVehicleDetails]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (vehicle) {
      setFormData({
        numero: vehicle.numero || '',
        matricula: vehicle.matricula || '',
        id_ruta: vehicle.id_ruta || '',
      });
    }
  };

  const handleSave = async () => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    const isUpdated = await updateVehicle(id, formData);
    if (isUpdated) {
      setIsEditing(false); // Exit editing mode
    }
  };

  const handleRouteChange = (newRouteId: string) => {
    setFormData((prevState: any) => ({
      ...prevState,
      id_ruta: newRouteId,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
      {vehicle ? (
        <Paper sx={{ padding: 3, width: '100%', maxWidth: 800 }}>
          <Typography variant="h5" gutterBottom>Detalles del Vehículo</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>ID Vehículo:</strong> {vehicle.id_vehiculos}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>ID Dueño:</strong> {vehicle.id_dueno}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Ruta:</strong></Typography>
              {isEditing ? (
                <EditRouteComponent
                  selectedRoute={formData.id_ruta}
                  onRouteChange={handleRouteChange}
                />
              ) : (
                <Typography variant="body1">{vehicle.rutas?.nombre}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Número:</strong></Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  value={formData.numero}
                  onChange={handleChange}
                  name="numero"
                  variant="outlined"
                  margin="normal"
                />
              ) : (
                <Typography variant="body1">{vehicle.numero}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Matrícula:</strong></Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  value={formData.matricula}
                  onChange={handleChange}
                  name="matricula"
                  variant="outlined"
                  margin="normal"
                />
              ) : (
                <Typography variant="body1">{vehicle.matricula}</Typography>
              )}
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 2 }}>
            {isEditing ? (
              <>
                <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginRight: 2 }}>
                  Guardar Cambios
                </Button>
                <Button onClick={handleCancelEdit} variant="outlined" color="secondary">
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} variant="contained" color="primary">
                Editar Información
              </Button>
            )}
          </Box>
        </Paper>
      ) : (
        <Typography variant="h6" color="error">No se encontraron detalles del vehículo</Typography>
      )}
    </Box>
  );
};

export default DetailsCombis;
