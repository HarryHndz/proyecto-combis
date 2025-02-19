import { IRegister, ISession, IUser } from "@/domain/entities/IAuth";

export interface AuthInterface{
  register(dataRegister:IRegister):Promise<void>
  login(dataSession:ISession):Promise<IUser>
}