import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import { FormField } from "@/presentation/components/FormField";
import { IRegister } from "@/domain/entities/IAuth";
import validationSchema from "@/domain/validation/RegisterValidation";
import { FormCheckbox } from "@/presentation/components/Checkbox";
import { InputSelect } from "@/presentation/components/InputSelect";
import { SEX, USERS } from "@/presentation/utils/constants";
import { AuthRepository } from "@/data/repository/authRepository";
import { AuthUseCases } from "@/domain/useCases/authUseCases";
import {useNavigate} from 'react-router-dom'
export default function Register(){
  const authRepository = new AuthUseCases(new AuthRepository())
  const initialValues:IRegister = {
    name: "",
    paternalSurName: "",
    maternalSurName: "",
    gender: "",
    userType: 'passengers',
    curp: "",
    rfc: "",
    date: "",
    email: "",
    password: "",
    confirmPassword: "",
    username:"",
    conditionsTerms: false,
  }
  const  navigate = useNavigate()
  const onSubmit = async(values:IRegister)=>{
    try {
      await authRepository.register(values)
    } catch (error) {
      console.log(error);
    }
  }
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  } = useFormikForm<IRegister>({initialValues,validationSchema,onSubmit})

  const handleNavigateToLogin=()=> navigate('/login') 
 
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
                value={values.name}
                errorMessage={errors.name}
                touched={touched.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              <Stack direction="row" spacing={2}>
                <FormField 
                  label="Apellido paterno"
                  value={values.paternalSurName}
                  errorMessage={errors.paternalSurName}
                  touched={touched.paternalSurName}
                  onChange={handleChange('paternalSurName')}
                  onBlur={handleBlur('paternalSurName')}
                />
                <FormField 
                  label="Apellido materno"
                  value={values.maternalSurName}
                  errorMessage={errors.maternalSurName}
                  touched={touched.maternalSurName}
                  onChange={handleChange('maternalSurName')}
                  onBlur={handleBlur('maternalSurName')}
                />
              </Stack>
              <InputSelect
                label="sexo"
                data={SEX}
                value={values.gender}
                handleChange={(e)=> setFieldValue('gender',e.target.value)}
              />
              <FormField
                type="date"
                label="Fecha nacimiento"
                value={values.date}
                errorMessage={errors.date}
                onChange={handleChange('date')}
                onBlur={handleBlur('date')}
                slotProps={{
                  inputLabel:{
                    shrink:true
                  }
                }}
              />
              <FormField  
                label="Correo"
                value={values.email}
                errorMessage={errors.email}
                touched={touched.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormField 
                label="Contraseña"
                value={values.password}
                errorMessage={errors.password}
                touched={touched.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                type="password" 
                />
              <FormField
                label="Confirmar contraseña"
                value={values.confirmPassword}
                errorMessage={errors.confirmPassword}
                touched={touched.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                type="password"
              />

              <InputSelect
                label="Tipo de usuario"
                value={values.userType}
                data={USERS}
                handleChange={(e)=>setFieldValue('userType',e.target.value)}
              />
              {
                (values.userType === 'driver' || values.userType === 'boss') &&(
                  <Box>
                     <FormField
                      label="Curp"
                      value={values.curp}
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
                checked={values.conditionsTerms}
                label="Acepto los términos y condiciones"
                handleChange={()=>setFieldValue('conditionsTerms',!values.conditionsTerms)}
              />
              <Typography color="error" variant="body2">
                {touched.conditionsTerms && errors.conditionsTerms}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="error" 
                  type="submit"
                  loading={isSubmitting}
                  >
                  Registrarse
                </Button>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  color="error"
                  onClick={handleNavigateToLogin}
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
