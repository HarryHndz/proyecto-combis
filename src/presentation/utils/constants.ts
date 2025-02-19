import { IUserType } from "@/domain/entities/IUserType";
import { IValues } from "@/domain/entities/IValues";

const SEX:IValues<string>[] =[
  {
  label:'Hombre',
  value:'1'
  },
  {
  label:'Mujer',
  value:'0'
  }
]


const USERS:IValues<IUserType>[] = [
  {
  label:'Pasajero',
  value:'passengers'
  },
  {
  label:'Chofer',
  value:'driver'
  },
  {
  label:'Dueño',
  value:'boss'
  },
]

const URL_SERVER = 'http://192.168.1.74:300'

export {
  USERS,
  SEX,
  URL_SERVER
}