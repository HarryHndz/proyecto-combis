import { IPlace, IRoutePlaceAdd } from "@/domain/entities/IPlaces";
import { FormCheckbox } from "@/presentation/components/Checkbox";
import { FormField } from "@/presentation/components/FormField";
import { ModalAddPlace } from "@/presentation/components/ModalAddPlace";
import { Avatar, Box, Button, Container,IconButton,List,ListItem,ListItemAvatar,ListItemText,Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import PlaceIcon from '@mui/icons-material/Place';
import { useFormikForm } from "@/presentation/hooks/useFormikValues";
import DeleteIcon from '@mui/icons-material/Delete';
import placeValidation from "@/domain/validation/placesValidation";
import { PlaceUseCases } from "@/domain/useCases/placeUseCases";
import { useNavigate } from "react-router-dom";

export default function AddPlace() {
  const router = useNavigate()
  const [places,setPlaces] = useState<IPlace[]>([])
  const [locationCurrent,setLocationCurrent] = useState({
    latitude:0,
    longitude:0
  })
  const [activate,setActivate] = useState<boolean>(false)
  const theme = useTheme()
  const initialValues:IRoutePlaceAdd = {
    name:'',
    places:[],
  } 
  const onSubmit = async(values:IRoutePlaceAdd)=>{
    try {
      const placeUseCases = new PlaceUseCases()
      await placeUseCases.createPlace(values)
      router('/')
    } catch (error) {
      console.log(error)
    }
  }
  const {
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting,
      values,
      errors,
      touched,
    } = useFormikForm<IRoutePlaceAdd>(
      {initialValues,validationSchema:placeValidation,onSubmit}
    )
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((e)=>{
        setLocationCurrent({
          latitude:e.coords.latitude,
          longitude:e.coords.longitude
        })
      },(error)=>{
        console.log("error PERMISSION_DENIED ",error.PERMISSION_DENIED);
        console.log("error POSITION_UNAVAILABLE ",error.POSITION_UNAVAILABLE);
        console.log("error TIMEOUT ",error.TIMEOUT);
        console.log("error code ",error.code);
        console.log("error mesage ",error.message);
        
      })
    }else{
      console.log("geolocalización no soportada");
    }
  },[])

  
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
          flexDirection:'column',
          marginTop:'20px'
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{width:'80%',display:'flex',flexDirection:'column'}}
        >
        <Box sx={{width:'400px',padding:'30px 10px'}}>
          <Typography variant="h3" sx={{paddingBottom:'10px'}}>Agregar Rutas</Typography>
          <FormField 
            label="Nombre de la ruta"
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            error={touched.name && errors.name ? true :false}
          />
          <FormCheckbox 
            label="Activar ruta"
            checked
            handleChange={()=> setActivate(!activate)}
          />
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:'20px',marginBottom:'5px'}}>
            <Typography variant="h5">Paradas</Typography>
              <ModalAddPlace
              places={places}
              setPlaces={setPlaces}
              handleAdd={(e)=>{
                console.log("valores",e);
                setFieldValue('places',e)
              }}
              latitudeCurrent={locationCurrent.latitude}
              longitudeCurrent={locationCurrent.longitude}
            />
          </Box>
         
           <List sx={{ width: '100%', maxWidth: 360}}>
            {
              values.places.length > 0 ? values.places.map((item)=>(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                     <PlaceIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${item.name} - ${item.order}`} secondary={
                    <>
                     <Typography>{`Latitud: ${item.latitude}`}</Typography>
                     <Typography>{`Longitud: ${item.longitude}`}</Typography>
                    </>
                  } />
                  <IconButton onClick={()=>{
                    const newPlaces = values.places.filter((place)=>(place.name !== item.name))
                    setPlaces(newPlaces)
                    setFieldValue('places',newPlaces)
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              )) : <Typography>No se ha registrado ninguna ruta</Typography>
            }
          </List>
          <Button 
            fullWidth
            variant='outlined'
            type="submit"
            loading={isSubmitting}
          >Guardar
          </Button>
        </Box>
        </form>
        
      </Box>
    </Container>
  )
}
