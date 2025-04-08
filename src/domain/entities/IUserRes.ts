export interface IUserResData {
  id_usuario: number,
  id_persona: number,
  id_tipo_usuario: number,
  usuario: string,
  correo: string,
  activo: number,
  personas: {
    id_persona: number,
    nombre: string,
    apellido_pat: string,
    apellido_mat: string,
    sexo: number,
    fecha_nac: Date,
    curp: string,
    rfc: string,
  },
  tipo_usuarios: {
    id_tipo_usuario: number,
    nombre: string,
    descripcion: string
  }
}

export interface IUserRes {
  statusCode: number,
  success: boolean,
  message: string,
  data: IUserResData
}