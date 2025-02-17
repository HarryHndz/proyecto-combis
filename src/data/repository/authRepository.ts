import { AuthInterface } from "@/domain/repository/authInterface";
import { IRegister, ISession } from "@/domain/entities/IAuth";
import { ApiClient } from "@/data/apiClient";
import { IResponse } from "@/domain/entities/IResponse";

export class AuthRepository implements AuthInterface{
  private httpClient
  constructor(){
    this.httpClient = new ApiClient().getInstance()
  }
  async register(dataRegister: IRegister): Promise<void> {
    try {
      await this.httpClient.post('/register',{
        correo:dataRegister.email,
        contrasena:dataRegister.password,
        tipo_usuario:dataRegister.userType,
        persona:{
          nombre:dataRegister.name,
          apellido_pat:dataRegister.paternalSurName,
          apellido_mat:dataRegister.maternalSurName,
          sexo:dataRegister.gender,
          fecha_nacimiento:dataRegister.date,
          curp:dataRegister.curp,
          rfc:dataRegister.rfc
        },
      })
    } catch (error) {
      throw error
    }
  }
  async login(dataSession: ISession): Promise<ISession> {
    try {
      const {data} = await this.httpClient.post<IResponse>('/login',{
        correo:dataSession.email,
        contrasena:dataSession.password
      })
      const response:ISession ={
        email:data.data.correo,
        password:data.data.passoword
      } 
      return response
    } catch (error) {
      throw error
    }
  } 
  
}