import { Button } from "@mui/material";
import { useNavigate } from "react-router";


export default function Account() {
  const navigate = useNavigate();
  return(
    <div>
      <h1>Iniciar sesión</h1>
        <Button variant='contained' onClick={()=>navigate('/auth/login')}>Confirmar</Button>
    </div>
  )
}