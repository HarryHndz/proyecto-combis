import { AuthRepository } from "@/data/repository/authRepository";
import { ISession, IUser } from "@/domain/entities/IAuth";
import { AuthUseCases } from "@/domain/useCases/authUseCases";
import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import validationSchema from "@/domain/validation/loginValidation";
import { FormField } from "@/presentation/components/FormField";
import { useNavigate,Link } from "react-router";
import { LocalStoreRepository } from "@/data/repository/localRepository";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase";
import { useState } from "react";
import { useAuth } from "@/domain/validation/AuthContext";

export default function Login() {
  const initialValues: ISession = {
    username: "",
    password: "",
  };

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const authRepository = new AuthUseCases(new AuthRepository());
  const localRepository = new LocalStoreUseCase<IUser>(new LocalStoreRepository());
  const { login } = useAuth();

  const onSubmit = async (values: ISession) => {
    setLoginError("");
    try {
      const response = await authRepository.login(values);
      localRepository.save("user", response);
      login(response);
      navigate("/admin/");
    } catch (error: any) {
      setLoginError("Credenciales incorrectas o error en el servidor.");
      console.log(error);
    }
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    values,
    errors,
    touched,
  } = useFormikForm<ISession>({ initialValues, validationSchema, onSubmit });

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
          paddingY: 6,
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          boxShadow: 4,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4" align="center" color="error.main" gutterBottom fontWeight="bold">
          Iniciar sesión
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormField
            label="Usuario"
            value={values.username}
            errorMessage={errors.username}
            touched={touched.username}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
          />

          <FormField
            label="Contraseña"
            value={values.password}
            type="password"
            errorMessage={errors.password}
            touched={touched.password}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
          />

          <Button
            fullWidth
            variant="contained"
            color="error"
            type="submit"
            sx={{ mt: 3, mb: 1, py: 1.3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2">
            ¿No tienes cuenta?{" "}
            <Link to='/auth/register'>
              Registrarse
            </Link>
          </Typography>
        </Box>
        <Link to='/user/home' replace>
          home
        </Link>
      </Box>
    </Box>
  );
}
