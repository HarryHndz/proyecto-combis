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
import { useState, useEffect } from "react";
import { FormField } from "@/presentation/components/FormField";
import { useVehicleFormikForm } from "@/presentation/hooks/useFormikCombis";
import validationSchema from "@/domain/validation/VehiclesValidation";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import CustomAlert from "@/presentation/components/alert";
import useVehiclesData from "@/presentation/hooks/useVehiclesData";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase";
import { IUser } from "@/domain/entities/IAuth";
import { LocalStoreRepository } from "@/data/repository/localRepository";

interface VehicleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const VehicleFormModal = ({ open, onClose, onSuccess }: VehicleFormModalProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    severity: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  const { registerVehicle, loading } = useVehiclesData();
  const localRepository = new LocalStoreUseCase<IUser>(new LocalStoreRepository())
  const storedId = typeof window !== "undefined" ? localRepository.get('user') : null;
  const idDueno = storedId?.id

  useEffect(() => {
    if (!idDueno && open) {
      setAlertData({
        severity: "error",
        title: "ID no encontrado",
        message: "No se encontró el ID del dueño. Intenta iniciar sesión nuevamente.",
      });
      setShowAlert(true);
    }
  }, [idDueno, open]);

  const initialValues: Partial<IRegisterVehicle> = {
    numero: "",
    matricula: "",
    id_dueno: idDueno ?? undefined,
    id_ruta: undefined,
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useVehicleFormikForm({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!idDueno) return;

      try {
        await registerVehicle({
          ...values,
          id_dueno: idDueno,
          id_ruta: values.id_ruta ?? undefined,
        });

        setAlertData({
          severity: "success",
          title: "Registro exitoso",
          message: "La combi se ha registrado correctamente.",
        });
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          resetForm();
          onClose();
          onSuccess?.();
        }, 2500);
      } catch {
        setAlertData({
          severity: "error",
          title: "Error",
          message: "Ocurrió un error al registrar la combi. Intenta nuevamente.",
        });
        setShowAlert(true);
      }
    },
  });

  useEffect(() => {
    if (open) {
      resetForm();
      setAlertData(null);
      setShowAlert(false);
    }
  }, [open, resetForm]);

  if (!idDueno) return null;

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
          onSubmit={handleSubmit}
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
            autoFocus
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
        <Button onClick={onClose} variant="outlined" color="secondary" disabled={loading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          variant="contained"
          color="primary"
          disabled={isSubmitting || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? "Registrando..." : "Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleFormModal;
export { VehicleFormModal };
export type { VehicleFormModalProps };  