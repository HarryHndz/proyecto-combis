import { IGetDriver } from "../entities/IDriver";
import { IUserRes } from "../entities/IUserRes";

export interface AdminInterface{
  getDataUser(id: number):Promise<IUserRes>
  getChoferes():Promise<IGetDriver>
  getDataDriver(id: number):Promise<IGetDriver>
}