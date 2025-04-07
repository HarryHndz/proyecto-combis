import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useState } from "react";
import { FormField } from "@/presentation/components/FormField";
import { useVehicleFormikForm } from "@/presentation/hooks/useFormikCombis";
import validationSchema from "@/domain/validation/VehiclesValidation";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import { VehicleUseCases } from "@/domain/useCases/vehiclesUseCases";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import CustomAlert from "@/presentation/components/alert";

interface VehicleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const VehicleFormModal = ({ open, onClose, onSuccess }: VehicleFormModalProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    severity: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const vehicleRepository = new VehicleRepository();
  const vehicleUseCases = new VehicleUseCases(vehicleRepository);

  const initialValues: Partial<IRegisterVehicle> = {
    numero: "",
    matricula: "",
    id_dueno: 2,
    id_ruta: undefined,
  };

  const handleSubmit = async (values: Partial<IRegisterVehicle>) => {
    setIsLoading(true);
    setAlertData(null);
    try {
      const dataToSend = {
        numero: values.numero,
        matricula: values.matricula,
        id_dueno: 1,
        id_ruta: values.id_ruta ?? undefined,
      };

      await vehicleUseCases.registerVehicle(dataToSend);

      setAlertData({
        severity: "success",
        title: "Registro Exitoso",
        message: "La combi se ha registrado correctamente.",
      });

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 3000);
    } catch (error) {
      console.error("Error al registrar la combi:", error);
      setAlertData({
        severity: "error",
        title: "Error",
        message: "Ocurrió un error al registrar la combi. Intenta nuevamente.",
      });
      setShowAlert(true);
    } finally {
      setIsLoading(false);
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
  } = useVehicleFormikForm({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <DirectionsBusIcon color="primary" />
          <Typography variant="h6" fontWeight="bold" color="primary">
            Registro de Combi
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {showAlert && alertData && (
          <CustomAlert
            severity={alertData.severity}
            title={alertData.title}
            message={alertData.message}
            onClose={() => setShowAlert(false)}
          />
        )}
        <Box
          component="form"
          onSubmit={formikSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          mt={1}
        >
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "1rem 1.5rem" }}>
        <Button onClick={onClose} variant="outlined" color="secondary" disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={() => formikSubmit()}
          variant="contained"
          color="primary"
          disabled={isSubmitting || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? "Registrando..." : "Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleFormModal;
