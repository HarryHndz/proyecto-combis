import React, { useState, useEffect } from "react";
import { Stack, Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FormField } from "@/presentation/components/FormField";
import ImageUpload from "@/presentation/components/imagenUpload";
import { useVehiclesData } from "@/presentation/hooks/useVehiclesData";
//cambios
const UpdateVehiculoForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const { vehicles, loading, error, updateVehicle } = useVehiclesData(); 
  const [formData, setFormData] = useState({
    numero: "",
    matricula: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      const vehicle = vehicles.find((v) => v.id === id);
      if (vehicle) {
        setFormData({
          numero: vehicle.numero,
          matricula: vehicle.matricula,
          image: typeof vehicle.image === "string" ? vehicle.image : "",
        });
      }
    }
  }, [id, vehicles]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedData = {
        numero: formData.numero,
        matricula: formData.matricula,
        image: selectedImage ?? (formData.image ? null : undefined),
      };

      if (id) {
        await updateVehicle(id, updatedData);
      } else {
        console.error("El ID del vehículo no está definido.");
      }
      navigate(-1);
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        Actualiza los datos del vehículo
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems="center">
          <ImageUpload onImageChange={handleImageChange} initialImage={formData.image || ""} />

          <FormField
            name="numero"
            label="Número"
            value={formData.numero}
            onChange={(e) => handleChange("numero", e.target.value)}
          />
          <FormField
            name="matricula"
            label="Matrícula"
            value={formData.matricula}
            onChange={(e) => handleChange("matricula", e.target.value)}
          />

          <Box mt={3} display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Actualizar
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateVehiculoForm;
