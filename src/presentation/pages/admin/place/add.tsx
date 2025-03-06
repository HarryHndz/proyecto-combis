import { FormCheckbox } from "@/presentation/components/Checkbox";
import { FormField } from "@/presentation/components/FormField";
import { Box, Button, Container, useTheme } from "@mui/material";


export default function AddPlace() {
  const theme = useTheme()
  return(
    <Container>
      <Box
        sx={{
          borderRadius:'10px',
          backgroundColor:theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
          display:'flex',
          width:'100%',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column'
        }}
      >
        <form
        style={{width:'80%',display:'flex',flexDirection:'column'}}
        >
          <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-93.2146422!3d17.9794344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d32e8b1b4ef77b%3A0xc76ed3b6d5042a97!2sTabasco!5e0!3m2!1ses!2smx!4v1676187192837!5m2!1ses!2smx"
          style={{ width: '100%', height: '300px', border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        <Box sx={{width:'400px'}}>
          <FormField 
            label="Nombre"
          />
          <FormCheckbox 
            label="Activar ruta"
            checked
            handleChange={()=> false}
          />
          <Button 
            fullWidth
            variant='outlined'>Guardar</Button>
        </Box>
        </form>
      </Box>
    </Container>
  )
}