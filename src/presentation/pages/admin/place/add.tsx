import { IPlace, IRoute } from "@/domain/entities/IPlaces";
import { FormCheckbox } from "@/presentation/components/Checkbox";
import { FormField } from "@/presentation/components/FormField";
import { ModalAddPlace } from "@/presentation/components/ModalAddPlace";
import { Avatar, Box, Button, Container,List,ListItem,ListItemAvatar,ListItemText,Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import placeValidation from "@/domain/validation/placesValidation";

export default function AddPlace() {
  const [places,setplaces] = useState<IPlace[]>([])
  const [activate,setActivate] = useState<boolean>(false)
  const theme = useTheme()
  const [initialValues,setInitialValues] =useState<IRoute>({
    name:'',
    places,
  }) 
  const onSubmit = async(values:IRoute)=>{
    try {
      // const response = await authRepository.login(values)
      // localRepository.save('user',response)
      // navigate('/home')
    } catch (error) {
      // console.log(error)
      
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
    } = useFormikForm<IRoute>({initialValues,validationSchema:placeValidation,onSubmit})
  
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
        <Box sx={{width:'400px'}}>
          <Typography>Agregar Rutas</Typography>
          <FormField 
            label="Nombre de la ruta"
          />
          <Typography>Paradas</Typography>
          <FormCheckbox 
            label="Activar ruta"
            checked
            handleChange={()=> setActivate(!activate)}
          />
           <List sx={{ width: '100%', maxWidth: 360}}>
            {
              places.length > 0 ? places.map((item)=>(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.order} />
                </ListItem>
              )) : <Typography>No se ha registrado ninguna ruta</Typography>
            }
          </List>
          <ModalAddPlace 
            places={places}
            setPlaces={setplaces}
          />
          <Button 
            fullWidth
            variant='outlined'>Guardar
          </Button>
        </Box>
        </form>
        
      </Box>
    </Container>
  )
}




// <iframe
// title="Google Map"
// src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-93.2146422!3d17.9794344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d32e8b1b4ef77b%3A0xc76ed3b6d5042a97!2sTabasco!5e0!3m2!1ses!2smx!4v1676187192837!5m2!1ses!2smx"
// style={{ width: '100%', height: '300px', border: 0 }}
// allowFullScreen
// loading="lazy"
// />