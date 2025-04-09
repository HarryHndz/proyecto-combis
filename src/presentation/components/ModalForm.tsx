import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useEffect, useState } from "react";
import { FormField } from "@/presentation/components/FormField";
import { useVehicleFormikForm } from "@/presentation/hooks/useFormikCombis";
import validationSchema from "@/domain/validation/VehiclesValidation";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import CustomAlert from "@/presentation/components/alert";
import useVehiclesData from "@/presentation/hooks/useVehiclesData";
import { PlaceUseCases } from "@/domain/useCases/placeUseCases";
import { IRoute } from "@/domain/entities/IPlaces";

interface VehicleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  idDueno?: number;
}

const VehicleFormModal = ({
  open,
  onClose,
  onSuccess,
  idDueno,
}: VehicleFormModalProps) => {
  const [alertData, setAlertData] = useState<{
    severity: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  const [routes, setRoutes] = useState<IRoute[]>([]);
  const { registerVehicle, loading } = useVehiclesData();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const useCase = new PlaceUseCases();
        const fetchedRoutes = await useCase.getRoutes();
        setRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Error al obtener rutas:", error);
      }
    };

    if (open) {
      fetchRoutes();
    }
  }, [open]);

  useEffect(() => {
    if (!idDueno && open) {
      setAlertData({
        severity: "error",
        title: "ID no encontrado",
        message: "No se encontró el ID del dueño. Intenta iniciar sesión nuevamente.",
      });
    }
  }, [idDueno, open]);

  const initialValues: Partial<IRegisterVehicle> = {
    id_dueno: idDueno,
    id_ruta: undefined,
    numero: "",
    matricula: "",
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

        setTimeout(() => {
          resetForm();
          setAlertData(null);
          onClose();
          onSuccess?.();
        }, 2000);
      } catch {
        setAlertData({
          severity: "error",
          title: "Error",
          message: "Ocurrió un error al registrar la combi. Intenta nuevamente.",
        });
      }
    },
  });

  useEffect(() => {
    if (open) {
      resetForm();
      setAlertData(null);
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
        {alertData && (
          <CustomAlert
            severity={alertData.severity}
            title={alertData.title}
            message={alertData.message}
            onClose={() => setAlertData(null)}
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

          <FormControl fullWidth error={touched.id_ruta && Boolean(errors.id_ruta)}>
            <InputLabel id="route-select-label">Ruta</InputLabel>
            <Select
              labelId="route-select-label"
              id="route-select"
              name="id_ruta"
              value={values.id_ruta || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Ruta"
            >
              {routes.map((route) => (
                <MenuItem key={route.id} value={route.id}>
                  {route.name}
                </MenuItem>
              ))}
            </Select>
            {touched.id_ruta && errors.id_ruta && (
              <Typography variant="caption" color="error">
                {errors.id_ruta}
              </Typography>
            )}
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "1rem 1.5rem" }}>
        <Button onClick={onClose} variant="outlined" color="secondary" disabled={loading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          variant="contained"
          color="primary"
          disabled={isSubmitting || loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
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
