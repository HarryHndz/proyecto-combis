import { IPlace } from "@/domain/entities/IPlaces"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"

interface IPropsModalAddPlace {
  setPlaces:(value:IPlace[])=>void
  places:IPlace[]
}

export const ModalAddPlace =  ({places,setPlaces}:IPropsModalAddPlace)=>{
  const [openModal,setOpenModal] = useState<boolean>(false)
  const [values,setValues] = useState<IPlace>({
    latitude:'-100',
    longitude:'100',
    name:'',
    order:''
  })
  const addNewRoute = ()=>{
    setPlaces([...places,values])
    setValues({
      ...values,
      name:'',
      order:''
    })
    setOpenModal(false)
  }
  return(
    <>
      <Button 
        fullWidth
        variant='outlined'
        onClick={()=>setOpenModal(true)}
        >Agregar Ruta
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
              order:e.target.value
            })}
          />
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-93.2146422!3d17.9794344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d32e8b1b4ef77b%3A0xc76ed3b6d5042a97!2sTabasco!5e0!3m2!1ses!2smx!4v1676187192837!5m2!1ses!2smx"
            style={{ width: '300px', height: '300px', border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenModal(false)}>Cancel</Button>
          <Button onClick={addNewRoute}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
    
  )
}