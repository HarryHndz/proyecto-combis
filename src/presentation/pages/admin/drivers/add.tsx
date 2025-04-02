import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import validationSchema from "@/domain/validation/driverRegister";
import { IRegisterDriver } from "@/domain/entities/IDriver";
import { useNavigate } from "react-router-dom";
import { AdminUseCases } from "@/domain/useCases/adminUseCases";
import { AdminRepository } from "@/data/repository/adminRepository";
import { FormField } from "@/presentation/components/FormField";
import { InputSelect } from "@/presentation/components/InputSelect";
import { SEX } from "@/presentation/utils/constants";
import AddIcon from "@mui/icons-material/Add";

export default function AddDriver() {
  const adminRepository = new AdminUseCases(new AdminRepository());
  const navigate = useNavigate();
  const initialValues: IRegisterDriver = {
    name: "",
    paternalSurName: "",
    maternalSurName: "",
    gender: "",
    curp: "",
    rfc: "",
    date: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };

  const onSubmit = async (values: IRegisterDriver) => {
    try {
      await adminRepository.add(values);
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
  } = useFormikForm<IRegisterDriver>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleNavigateBack = () => navigate(-1);

  return (
    <Box margin={"auto"} mt={4} width={"85%"} height={"100%"}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Añadir chofer
        </Typography>
        <form onSubmit={handleSubmit}>
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
            label="Nombre de usuario"
            value={values.username}
            errorMessage={errors.username}
            touched={touched.username}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
          />
          <InputSelect
            label="sexo"
            data={SEX}
            value={values.gender}
            handleChange={(e) => setFieldValue("gender", e.target.value)}
          />
          <Box>
            <FormField
              label="Curp"
              value={values.curp}
              errorMessage={errors.curp}
              touched={touched.curp}
              onChange={handleChange("curp")}
              onBlur={handleBlur("curp")}
            />
            <FormField
              label="RFC"
              value={values.rfc}
              errorMessage={errors.rfc}
              touched={touched.rfc}
              onChange={handleChange("rfc")}
              onBlur={handleBlur("rfc")}
            />
          </Box>
          <FormField
            type="date"
            label="Fecha nacimiento"
            value={values.date}
            errorMessage={errors.date}
            onChange={handleChange("date")}
            onBlur={handleBlur("date")}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
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
            value={values.password}
            errorMessage={errors.password}
            touched={touched.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            type="password"
          />
          <FormField
            label="Confirmar contraseña"
            value={values.confirmPassword}
            errorMessage={errors.confirmPassword}
            touched={touched.confirmPassword}
            onChange={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            type="password"
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, width: "70%", margin: "auto", pt: 2 }}
          >
            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={<AddIcon />}
              loading={isSubmitting}
            >
              Registrar chofer
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              type="submit"
              onClick={handleNavigateBack}
            >
              Cancelar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
