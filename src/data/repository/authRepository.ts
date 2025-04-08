import { AuthInterface } from "@/domain/repository/authInterface";
import { IRegister, ISession, IUser } from "@/domain/entities/IAuth";
import { ApiClient } from "@/data/apiClient";

export class AuthRepository implements AuthInterface{
  private httpClient
  constructor(){
    this.httpClient = new ApiClient().getInstance()
  }
  async register(dataRegister: IRegister): Promise<void> {
    console.log("dataRegister", dataRegister);
    try {
      return await this.httpClient.post('/usuarios',{
        usuario: dataRegister.username,
        contrasena: dataRegister.password,
        correo: dataRegister.email,
        id_tipo_usuario: Number(dataRegister.userType),
        persona: {
          nombre: dataRegister.name,
          apellido_pat: dataRegister.paternalSurName,
          apellido_mat: dataRegister.maternalSurName,
          sexo: Number(dataRegister.gender),
          fecha_nac: dataRegister.date,
          curp: dataRegister.curp,
          rfc: dataRegister.rfc
        }
      })
    } catch (error) {
      throw error
    }
  }
  async login(dataSession: ISession): Promise<IUser> {
    try {
      const {data} = await this.httpClient.post('/auth/login',{
        usuario:dataSession.username,
        contrasena:dataSession.password
      })

      const response:IUser ={
        username:data.data.usuario.usuario,
        id:data.data.usuario.id,
        idTypeUser:data.data.usuario.tipo_usuario.id_tipo_usuario,
        token:data.data.access_token 
      } 
      return response
    } catch (error) {
      throw error
    }
  } 
  
}