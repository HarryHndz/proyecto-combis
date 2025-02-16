import { IRegister } from "@/data/interfaces/IRegister";

const initialValues:IRegister = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  sexo: "",
  tipoUsuario: "",
  curp: "",
  rfc: "",
  fechaNacimiento: "",
  correo: "",
  contraseña: "",
  confirmarContraseña: "",
  terminos: false,
};

export default initialValues;
