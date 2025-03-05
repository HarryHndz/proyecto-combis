import React, { useState } from "react";
import { Grid, Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormField } from "@/presentation/components/FormField";
import ImageUpload from "@/presentation/components/imagenUpload";

const VehicleForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numero: "",
    matricula: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Valores del formulario:", formData);
  };

  const handleCancel = () => {
    navigate(-1); 
  };

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
        Registro de Vehículo
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <ImageUpload />
          </Grid>

          <Grid item xs={12} md={8}>
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

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default VehicleForm;
