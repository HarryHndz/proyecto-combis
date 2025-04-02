import { IRegisterDriver } from "../entities/IDriver";

export interface AdminInterface{
  add(dataNew: IRegisterDriver):Promise<void>
}