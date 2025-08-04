import { useAuth } from "@/domain/validation/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function Profile(){
  const authUser = useAuth()
  const navigate = useNavigate();
  const handleLogout =() => {
    authUser.logout()
    return navigate('/aut/login');
  }
  return (
    <div>
      <h1>Cerrar sesión</h1>
      <Button variant='contained' onClick={handleLogout}>Confirmar</Button>
    </div>
  )
}