import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useRegisterForm } from "../../../hooks/register";
import { FormField, FormCheckbox } from "../../../components/register";

export const Register = () => {
  const { formik, tipoUsuario, setTipoUsuario } = useRegisterForm();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 900, width: "100%", display: "flex" }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src="/../../../../public/Register.png"
              alt="Illustration"
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h5" color="error" gutterBottom>
              Crear Cuenta
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <FormField field={{ label: "Nombre", name: "nombre" }} formik={formik} />
              <Stack direction="row" spacing={2}>
                <FormField field={{ label: "Apellido paterno", name: "apellidoPaterno" }} formik={formik} />
                <FormField field={{ label: "Apellido materno", name: "apellidoMaterno" }} formik={formik} />
              </Stack>
              <FormField
                field={{ label: "Sexo", name: "sexo" }}
                formik={formik}
                selectOptions={[
                  { value: "hombre", label: "Hombre" },
                  { value: "mujer", label: "Mujer" },
                ]}
              />
              <FormField
                field={{ label: "Fecha de nacimiento", name: "fechaNacimiento" }}
                formik={formik}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <FormField field={{ label: "Correo", name: "correo" }} formik={formik} />
              <FormField field={{ label: "Contraseña", name: "contraseña" }} formik={formik} type="password" />
              <FormField
                field={{ label: "Confirmar contraseña", name: "confirmarContraseña" }}
                formik={formik}
                type="password"
              />
              <FormField
                field={{ label: "Tipo de usuario", name: "tipoUsuario" }}
                formik={formik}
                selectOptions={[
                  { value: "usuario", label: "Usuario Común" },
                  { value: "chofer", label: "Chofer" },
                  { value: "dueño", label: "Dueño" },
                ]}
                onChange={(e) => {
                  formik.handleChange(e);
                  setTipoUsuario(e.target.value);
                }}
              />
              {(tipoUsuario === "chofer" || tipoUsuario === "dueño") && (
                <>
                  <FormField field={{ label: "CRUP", name: "crup" }} formik={formik} />
                  <FormField field={{ label: "RFC", name: "rfc" }} formik={formik} />
                </>
              )}
              <FormCheckbox
                field={{ name: "terminos" }}
                formik={formik}
                label="Acepto los términos y condiciones"
              />
              <Typography color="error" variant="body2">
                {formik.touched.terminos && formik.errors.terminos}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button fullWidth variant="contained" color="error" type="submit">
                  Registrarse
                </Button>
                <Button fullWidth variant="outlined" color="error">
                  Iniciar sesión
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};