import { AuthInterface } from "@/domain/repository/authInterface";
import { IRegister, ISession, IUser } from "@/domain/entities/IAuth";
import { ApiClient } from "@/data/apiClient";

export class AuthRepository implements AuthInterface{
  private httpClient
  constructor(){
    this.httpClient = new ApiClient().getInstance()
  }
  async register(dataRegister: IRegister): Promise<void> {
    try {
      await this.httpClient.post('/usuarios',{
        correo:dataRegister.email,
        contrasena:dataRegister.password,
        id_tipo_usuario:dataRegister.userType,
        persona:{
          nombre:dataRegister.name,
          apellido_pat:dataRegister.paternalSurName,
          apellido_mat:dataRegister.maternalSurName,
          sexo:dataRegister.gender,
          fecha_nac:dataRegister.date,
          curp:dataRegister.curp,
          rfc:dataRegister.rfc
        },
      })
    } catch (error) {
      throw error
    }
  }
  async login(dataSession: ISession): Promise<IUser> {
    try {
      const {data} = await this.httpClient.post('/usuarios',{
        usuario:dataSession.username,
        contrasena:dataSession.password
      })
      const response:IUser ={
        username:data.data.correo,
        id:data.usuario.id,
        idTypeUser:data.usuario.tipo_usuario.id,
        token:data.access_token 
      } 
      return response
    } catch (error) {
      throw error
    }
  } 
  
}