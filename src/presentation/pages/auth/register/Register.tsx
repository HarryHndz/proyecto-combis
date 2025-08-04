import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import { FormField } from "@/presentation/components/FormField";
import { IRegister } from "@/domain/entities/IAuth";
import validationSchema from "@/domain/validation/RegisterValidation";
import { InputSelect } from "@/presentation/components/InputSelect";
import { SEX, USERS } from "@/presentation/utils/constants";
import { AuthRepository } from "@/data/repository/authRepository";
import { AuthUseCases } from "@/domain/useCases/authUseCases";
import { useNavigate } from "react-router";

export default function Register() {
  const authRepository = new AuthUseCases(new AuthRepository());

  const initialValues: IRegister = {
    name: "",
    paternalSurName: "",
    maternalSurName: "",
    gender: "",
    userType: "",
    curp: "",
    rfc: "",
    date: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };

  const navigate = useNavigate();

  const onSubmit = async (values: IRegister) => {
    try {
      console.log("Valores del formulario", values);
      const data = await authRepository.register(values);
      console.log("Registro exitoso", data);
      navigate("auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  } = useFormikForm<IRegister>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: 1000,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: "error.light",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          
        </Box>

        <Box sx={{ flex: 2, p: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" color="error.main" gutterBottom fontWeight="bold">
            Crear Cuenta
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <form onSubmit={handleSubmit} noValidate>
            <FormField
              label="Nombre"
              value={values.name}
              errorMessage={errors.name}
              touched={touched.name}
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
            />

            <Stack direction="row" spacing={2}>
              <FormField
                label="Apellido paterno"
                value={values.paternalSurName}
                errorMessage={errors.paternalSurName}
                touched={touched.paternalSurName}
                onChange={handleChange("paternalSurName")}
                onBlur={handleBlur("paternalSurName")}
              />
              <FormField
                label="Apellido materno"
                value={values.maternalSurName}
                errorMessage={errors.maternalSurName}
                touched={touched.maternalSurName}
                onChange={handleChange("maternalSurName")}
                onBlur={handleBlur("maternalSurName")}
              />
            </Stack>

            <FormField
              label="Usuario"
              value={values.username}
              errorMessage={errors.username}
              touched={touched.username}
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
            />

            <InputSelect
              label="Sexo"
              data={SEX}
              value={values.gender}
              handleChange={(e) => setFieldValue("gender", e.target.value)}
            />

            <FormField
              type="date"
              label="Fecha de nacimiento"
              value={values.date}
              errorMessage={errors.date}
              onChange={handleChange("date")}
              onBlur={handleBlur("date")}
              touched={touched.date}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <FormField
              label="Correo"
              value={values.email}
              errorMessage={errors.email}
              touched={touched.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
            />

            <FormField
              label="Contraseña"
              type="password"
              value={values.password}
              errorMessage={errors.password}
              touched={touched.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
            />

            <FormField
              label="Confirmar contraseña"
              type="password"
              value={values.confirmPassword}
              errorMessage={errors.confirmPassword}
              touched={touched.confirmPassword}
              onChange={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
            />

            <InputSelect
              label="Tipo de usuario"
              data={USERS}
              value={values.userType}
              handleChange={(e) => setFieldValue("userType", e.target.value)}
            />

            {(values.userType === '2' || values.userType === '3') && (
              <Box>
                <FormField
                  label="CURP"
                  value={values.curp}
                  errorMessage={errors.curp}
                  onChange={handleChange("curp")}
                  onBlur={handleBlur("curp")}
                />
                <FormField
                  label="RFC"
                  value={values.rfc}
                  errorMessage={errors.rfc}
                  onChange={handleChange("rfc")}
                  onBlur={handleBlur("rfc")}
                />
              </Box>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                type="submit"
                loading={isSubmitting}
              >
                Registrarse
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => navigate("/")}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
