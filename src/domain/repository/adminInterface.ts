import { IGetDriver, IRegisterDriver } from "../entities/IDriver";
import { IUserRes } from "../entities/IUserRes";

export interface AdminInterface{
  add(dataNew: IRegisterDriver):Promise<void>
  getDataUser(id: number):Promise<IUserRes>
  getChoferes():Promise<IGetDriver>
  getDataDriver(id: number):Promise<IGetDriver>
}