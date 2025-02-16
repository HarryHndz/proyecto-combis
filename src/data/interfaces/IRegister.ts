import { IUserType } from "./IUserType";

export interface IRegister {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  fechaNacimiento: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
  tipoUsuario: IUserType;
  curp?: string;
  rfc?: string;
  terminos: boolean;
}