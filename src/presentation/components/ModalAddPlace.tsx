/* import { IPlace } from "@/domain/entities/IPlaces"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { useState,useRef,useEffect, } from "react"
//mport mapboxgl from 'mapbox-gl'
import { ACCESS_TOKEN } from "../utils/constants"

interface IPropsModalAddPlace {
  setPlaces:(value:IPlace[])=>void
  places:IPlace[]
  handleAdd:(balues:IPlace[])=>void
  latitudeCurrent?:number,
  longitudeCurrent?:number
}

export const ModalAddPlace =  ({places,setPlaces,handleAdd,latitudeCurrent,longitudeCurrent}:IPropsModalAddPlace)=>{
  const [openModal,setOpenModal] = useState<boolean>(false)
  const mapRef = useRef<mapboxgl.Map>()
  const mapContainerRef = useRef<HTMLDivElement>()
  const [values,setValues] = useState<IPlace>({
    latitude:latitudeCurrent ?? -12.047890,
    longitude:longitudeCurrent ?? -77.043456,
    name:'',
    order:0
  })
  const addNewRoute = ()=>{
    console.log("valfinal",values);
    
    const updatePlaces = [...places,values]
    console.log("upd",updatePlaces);
    setPlaces(updatePlaces)
    handleAdd(updatePlaces)
    setValues({
      ...values,
      name:'',
      order:0
    })
    setOpenModal(false)
  }


  useEffect(()=>{
    if (latitudeCurrent && longitudeCurrent){
      setValues({...values,latitude:latitudeCurrent,longitude:longitudeCurrent})
    }
    if (openModal) {
      mapboxgl.accessToken = ACCESS_TOKEN
      const timeOut = setTimeout(()=>{
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style:'mapbox://styles/mapbox/streets-v11',
          center:{
            lat:values.latitude,
            lng:values.longitude
          },
          zoom:10.12,
        })
        mapRef.current.on('click',(e)=>{
          setValues({
            ...values,
            latitude:e.lngLat.lat,
            longitude:e.lngLat.lng
          })   
      })},400)
      return()=>{
        clearTimeout(timeOut)
        mapRef.current.remove()
      }
    }

  },[openModal,latitudeCurrent,longitudeCurrent])
  
  return(
    <>
      <Button 
        sx={{width:'70px',height:'40px'}}
        variant='outlined'
        onClick={()=>setOpenModal(true)}
        >Agregar
      </Button>
      <Dialog
        open={openModal}
        onClose={()=>setOpenModal(false)}
      >
        <DialogTitle>Agregar Ruta</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e)=>setValues({
              ...values,
              name:e.target.value
            })}
            id="name"
            name="name"
            label="Nombre de la parada"
            type="text"
            fullWidth
            variant="standard"
        />
          <TextField
            autoFocus
            required
            margin="dense"
            id="order"
            name="order"
            label="Orden de la parada"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e)=>setValues({
              ...values,
              order:parseInt(e.target.value)
            })}
          />
          <div id="map-container" ref={mapContainerRef} style={{width:'100%',height:'300px'}} />
          <Typography>{`Latitud:${values.latitude} - Longitud:${values.longitude}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenModal(false)}>Cancel</Button>
          <Button onClick={addNewRoute}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
    
  )
} */