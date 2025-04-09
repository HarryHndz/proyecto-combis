import { IGetDriver } from "../entities/IDriver";
import { IUserRes } from "../entities/IUserRes";
import { IDriverCar } from "../entities/IDriverCar";

export interface AdminInterface{
  getDataUser(id: number):Promise<IUserRes>
  getChoferes():Promise<IGetDriver>
  getDataDriver(id: number):Promise<IGetDriver>
  getDataDriverCar(id: number):Promise<IDriverCar>
}