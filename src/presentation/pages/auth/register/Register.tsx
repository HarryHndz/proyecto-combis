import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import { FormField } from "@/presentation/components/FormField";
import { IRegister } from "@/domain/entities/IRegister";
import validationSchema from "@/domain/validation/RegisterValidation";
import { FormCheckbox } from "@/presentation/components/Checkbox";
import { InputSelect } from "@/presentation/components/InputSelect";
import { SEX, USERS } from "@/presentation/utils/constants";


export default function Register(){
  const onSubmit = (values:IRegister)=> console.log(values)
  const initialValues:IRegister = {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    sexo: "",
    tipoUsuario: 'passengers',
    curp: "",
    rfc: "",
    fechaNacimiento: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
    terminos: false,
  };


  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    isSubmitting
  } = useFormikForm<IRegister>({initialValues,validationSchema,onSubmit})

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
              src="@/public/Register.png"
              alt="Illustration"
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h5" color="error" gutterBottom>
              Crear Cuenta
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormField  
                label="Nombre"
                value={values.nombre}
                errorMessage={errors.nombre}
                touched={touched.nombre}
                onChange={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
              />
              <Stack direction="row" spacing={2}>
                <FormField 
                  label="Apellido paterno"
                  value={values.apellidoPaterno}
                  errorMessage={values.apellidoPaterno}
                  touched={touched.apellidoPaterno}
                  onChange={handleChange('apellidoPaterno')}
                  onBlur={handleBlur('apellidoPaterno')}
                />
                <FormField 
                  label="Apellido materno"
                  value={values.apellidoMaterno}
                  errorMessage={errors.apellidoMaterno}
                  touched={touched.apellidoMaterno}
                  onChange={handleChange('apellidoMaterno')}
                  onBlur={handleBlur('apellidoMaterno')}
                />
              </Stack>
              <InputSelect
                label="sexo"
                data={SEX}
                value={values.sexo}
                handleChange={(e)=> setFieldValue('sexo',e.target.value)}
              />
              <FormField
                type="date"
                label="Fecha nacimiento"
                value={values.fechaNacimiento}
                errorMessage={errors.fechaNacimiento}
                onChange={handleChange('fechaNacimiento')}
                onBlur={handleBlur('fechaNacimiento')}
                slotProps={{
                  inputLabel:{
                    shrink:true
                  }
                }}
              />
              <FormField  
                label="Correo"
                value={values.correo}
                errorMessage={errors.correo}
                touched={touched.correo}
                onChange={handleChange('correo')}
                onBlur={handleBlur('correo')}
              />
              <FormField 
                label="Contraseña"
                value={values.contraseña}
                errorMessage={errors.contraseña}
                touched={touched.contraseña}
                onChange={handleChange('contraseña')}
                onBlur={handleBlur('contraseña')}
                type="password" 
                />
              <FormField
                label="Confirmar contraseña"
                value={values.confirmarContraseña}
                errorMessage={errors.confirmarContraseña}
                touched={touched.confirmarContraseña}
                onChange={handleChange('confirmarContraseña')}
                onBlur={handleBlur('confirmarContraseña')}
                type="password"
              />

              <InputSelect
                label="Tipo de usuario"
                value={values.tipoUsuario}
                data={USERS}
                handleChange={(e)=>setFieldValue('tipoUsuario',e.target.value)}
              />
              {
                values.tipoUsuario === 'driver' || values.tipoUsuario === 'boss' &&(
                  <Box>
                     <FormField
                      label="Curp"
                      value={values.curp ?? ''}
                      errorMessage={errors.curp}
                      onChange={handleChange('curp')}
                      onBlur={handleBlur('curp')}
                    />
                    <FormField
                      label="RFC"
                      value={values.rfc}
                      errorMessage={errors.rfc}
                      onChange={handleChange('rfc')}
                      onBlur={handleBlur('rfc')}
                    />
                  </Box>
                )
              
              }
              <FormCheckbox
                checked={values.terminos}
                label="Acepto los términos y condiciones"
                handleChange={()=>setFieldValue('terminos',!values.terminos)}
              />
              <Typography color="error" variant="body2">
                {touched.terminos && errors.terminos}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="error" 
                  type="submit">
                  Registrarse
                </Button>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="error"
                  loading={isSubmitting}
                >
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
