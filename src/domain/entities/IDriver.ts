
export interface IRegisterDriver {
  username: string,
  name: string
  paternalSurName: string
  maternalSurName: string
  gender: string
  date: string
  email: string
  password: string
  confirmPassword: string
  curp: string
  rfc: string
}

export interface IDriverUser {
  id_usuario: number,
  id_persona: number,
  id_tipo_usuario: number,
  usuario: string,
  contrasena: string,
  correo: string,
  activo: number,
  personas: {
    id_persona: number,
    nombre: string,
    apellido_pat: string,
    apellido_mat: string,
    sexo: number,
    fecha_nac: string,
    curp: string,
    rfc: string,
  }
}

export interface IDrivePerson {
  id_conductor: number,
  id_vehiculos: number,
  id_usuario: number,
  usuarios: IDriverUser
}

export interface IGetDriver {
  statusCode: number,
  success: boolean,
  message: string,
  data: IDrivePerson[]
}