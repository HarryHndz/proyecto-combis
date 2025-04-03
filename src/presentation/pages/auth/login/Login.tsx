import { AuthRepository } from "@/data/repository/authRepository";
import { ISession, IUser } from "@/domain/entities/IAuth";
import { AuthUseCases } from "@/domain/useCases/authUseCases";
import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import { Box, Button, Typography, Link } from "@mui/material";
import validationSchema from "@/domain/validation/loginValidation";
import { FormField } from "@/presentation/components/FormField";
import { useNavigate } from "react-router-dom";
import { LocalStoreRepository } from "@/data/repository/localRepository";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase";
export default function Login(){
  const initialValues:ISession ={
    username:"",
    password:""
  }
  const navigate = useNavigate()
  const authRepository = new AuthUseCases(new AuthRepository())
  const localRepository = new LocalStoreUseCase<IUser>(new LocalStoreRepository())
  const onSubmit = async(values:ISession)=>{
    try {
      const response = await authRepository.login(values)
      localRepository.save('user',response)
      navigate('/home')
    } catch (error) {
      console.log(error)
      
    }
  }
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    values,
    errors,
    touched,
  } = useFormikForm<ISession>({initialValues,validationSchema,onSubmit})
  return (
    <Box
      sx={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F6F7F9",
      }}
    >
      <Box
        sx={{
          paddingX: 4,
          paddingY: 8,
          backgroundColor: "#FEFEFE",
          borderRadius: 4,
          boxShadow: 5,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4" color="#000000" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormField 
            value={values.username}
            label="Usuario"
            errorMessage={errors.username}
            touched={touched.username}
            onChange={handleChange('username')}
            onBlur={handleBlur('username')}
          />
           <FormField 
            value={values.password}
            label="Contraseña"
            errorMessage={errors.password}
            touched={touched.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          <Button
            fullWidth
            variant="contained"
            color="error"
            type="submit"
            loading={isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Link href="register" underline="hover" color="#FD5353">
            Registrarse
          </Link>
          <Link href="#" underline="hover" color="#FD5353">
            Recuperar contraseña
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
