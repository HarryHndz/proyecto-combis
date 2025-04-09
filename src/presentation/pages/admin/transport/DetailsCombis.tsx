import { Box, CircularProgress, Typography, Button, Stack, Paper, TextField, Divider, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';  // Importa useNavigate
import { useEffect, useState } from 'react';
import useVehiclesData from '@/presentation/hooks/useVehiclesData';
import EditRouteComponent from '@/presentation/components/selectupdate';  // Asegúrate de importar el componente
import { Edit, DirectionsBus, ConfirmationNumber, LocalParking, ArrowBack } from '@mui/icons-material';  // Importar iconos

const DetailsCombis = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Inicializa useNavigate
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
      // Refrescar los datos después de guardar
      const updatedVehicle = await getVehicleDetails(id); // Obtener los detalles actualizados
      setVehicle(updatedVehicle); // Actualizar el estado local con los datos actualizados
      setIsEditing(false); // Salir del modo de edición
    } else {
      console.error("Error al actualizar el vehículo.");
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

  const handleGoBack = () => {
    navigate(-1);  // Redirige al usuario a la página anterior
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
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3, position: 'relative' }}>
      {vehicle ? (
        <Paper sx={{ padding: 3, width: '100%', maxWidth: 800 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Detalles del Vehículo
          </Typography>

          {/* Icono de Regresar */}
          <IconButton
            onClick={handleGoBack}
            sx={{
              color: 'primary.main',
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '50%',
              padding: 1
            }}
          >
            <ArrowBack />
          </IconButton>

          <Stack spacing={2}>
            {/* ID Vehículo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalParking sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography variant="body1"><strong>ID Vehículo:</strong> {vehicle.id_vehiculos}</Typography>
            </Box>

            <Divider />

            {/* Ruta */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsBus sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography variant="body1"><strong>Ruta:</strong></Typography>
            </Box>
            {isEditing ? (
              <EditRouteComponent
                selectedRoute={formData.id_ruta}
                onRouteChange={handleRouteChange}
              />
            ) : (
              <Typography variant="body1">{vehicle.rutas?.nombre}</Typography>
            )}

            <Divider />

            {/* Número */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ConfirmationNumber sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography variant="body1"><strong>Número:</strong></Typography>
            </Box>
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

            <Divider />

            {/* Matrícula */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Edit sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography variant="body1"><strong>Matrícula:</strong></Typography>
            </Box>
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
          </Stack>

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
