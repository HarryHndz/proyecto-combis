import { Box, Button, Typography, useTheme, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormField } from "@/presentation/components/FormField";
import ImageUpload from "@/presentation/components/imagenUpload";
import { useVehicleFormikForm } from "@/presentation/hooks/useFormikCombis";
import validationSchema from "@/domain/validation/VehiclesValidation"; 
import { IRegisterVehicle } from "@/domain/entities/IVehicles"; 
import { VehicleUseCases } from "@/domain/useCases/vehiclesUseCases"; 
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
//cambios 
const VehicleForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();


  const vehicleRepository = new VehicleRepository();
  const vehicleUseCases = new VehicleUseCases(vehicleRepository);

  const initialValues: IRegisterVehicle = {
    id: "",
    numero: "",
    matricula: "",
    image: null,
  };

  const handleSubmit = async (values: IRegisterVehicle) => {
    try {
      await vehicleUseCases.registerVehicle(values);
      console.log("Combi registrada:", values);
    } catch (error) {
      console.error("Error al registrar la combi:", error);
    }
  };

  
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit: formikSubmit,
    isSubmitting,
    touched,
    setFieldValue,
  } = useVehicleFormikForm({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

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
        Registro de Combi
      </Typography>

      <form onSubmit={formikSubmit}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
          <Box flex={{ xs: "none", md: 1 }}>
            <ImageUpload
              onImageChange={(image: File | null) => setFieldValue("image", image)}
            />
          </Box>

          <Box flex={{ xs: "none", md: 2 }}>
            <FormField
              name="numero"
              label="Número"
              value={values.numero}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.numero && Boolean(errors.numero)}
              helperText={touched.numero && errors.numero}
            />
            <FormField
              name="matricula"
              label="Matrícula"
              value={values.matricula}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.matricula && Boolean(errors.matricula)}
              helperText={touched.matricula && errors.matricula}
            />

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Enviar
              </Button>
            </Box>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default VehicleForm;
