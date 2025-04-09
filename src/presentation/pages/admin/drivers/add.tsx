/* import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import validationSchema from "@/domain/validation/driverRegister";
import { useNavigate } from "react-router-dom";
import { FormField } from "@/presentation/components/FormField";
import { InputSelect } from "@/presentation/components/InputSelect";
import { SEX } from "@/presentation/utils/constants";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthUseCases } from "@/domain/useCases/authUseCases";
import { AuthRepository } from "@/data/repository/authRepository";
import { IRegister } from "@/domain/entities/IAuth";
import { LoadingButton } from "@mui/lab";

export default function AddDriver() {
  const navigate = useNavigate();
  const authRepository = new AuthUseCases(new AuthRepository());

  const initialValues: IRegister = {
    name: "",
    paternalSurName: "",
    maternalSurName: "",
    gender: "1",
    curp: "",
    rfc: "",
    date: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    userType: "3"
  };

  const onSubmit = async (values: IRegister) => {
    try {
      await authRepository.register(values);
      navigate(-1);
    } catch (error) {
      console.log(error);
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

  const handleNavigateBack = () => navigate(-1);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      mt={5}
      px={2}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom align="center">
          Registrar Chofer
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormField
              label="Nombre"
              value={values.name}
              errorMessage={errors.name}
              touched={touched.name}
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
            />

            <Box display="flex" gap={2}>
              <Box flex={1}>
                <FormField
                  label="Apellido paterno"
                  value={values.paternalSurName}
                  errorMessage={errors.paternalSurName}
                  touched={touched.paternalSurName}
                  onChange={handleChange("paternalSurName")}
                  onBlur={handleBlur("paternalSurName")}
                />
              </Box>
              <Box flex={1}>
                <FormField
                  label="Apellido materno"
                  value={values.maternalSurName}
                  errorMessage={errors.maternalSurName}
                  touched={touched.maternalSurName}
                  onChange={handleChange("maternalSurName")}
                  onBlur={handleBlur("maternalSurName")}
                />
              </Box>
            </Box>

            <FormField
              label="Nombre de usuario"
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
              label="Fecha nacimiento"
              value={values.date}
              errorMessage={errors.date}
              onChange={handleChange("date")}
              onBlur={handleBlur("date")}
              touched={touched.date}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Box display="flex" gap={2}>
              <Box flex={1}>
                <FormField
                  label="CURP"
                  value={values.curp}
                  errorMessage={errors.curp}
                  touched={touched.curp}
                  onChange={handleChange("curp")}
                  onBlur={handleBlur("curp")}
                />
              </Box>
              <Box flex={1}>
                <FormField
                  label="RFC"
                  value={values.rfc}
                  errorMessage={errors.rfc}
                  touched={touched.rfc}
                  onChange={handleChange("rfc")}
                  onBlur={handleBlur("rfc")}
                />
              </Box>
            </Box>

            <FormField
              label="Correo electrónico"
              value={values.email}
              errorMessage={errors.email}
              touched={touched.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
            />

            <Box display="flex" gap={2}>
              <Box flex={1}>
                <FormField
                  label="Contraseña"
                  value={values.password}
                  errorMessage={errors.password}
                  touched={touched.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  type="password"
                />
              </Box>
              <Box flex={1}>
                <FormField
                  label="Confirmar contraseña"
                  value={values.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  type="password"
                />
              </Box>
            </Box>

            <Stack direction="row" spacing={2} mt={4} justifyContent="center">
              <LoadingButton
                variant="contained"
                type="submit"
                startIcon={<AddIcon />}
                loading={isSubmitting}
                sx={{ px: 4 }}
              >
                Registrar
              </LoadingButton>
              <Button
                variant="outlined"
                color="error"
                onClick={handleNavigateBack}
                startIcon={<ArrowBackIcon />}
                sx={{ px: 4 }}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
} */