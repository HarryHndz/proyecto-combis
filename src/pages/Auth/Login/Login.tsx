import { Box, TextField, Button, Typography, Link } from "@mui/material";

export const Login = () => {
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

        <TextField
          fullWidth
          label="Correo"
          variant="outlined"
          margin="normal"
          type="email"
        />

        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          margin="normal"
          type="password"
        />

        <Button
          fullWidth
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2 }}
        >
          Ingresar
        </Button>

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
