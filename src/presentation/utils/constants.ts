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

const URL_SERVER = 'https://34p0bkp2-3000.usw3.devtunnels.ms/'

export {
  USERS,
  SEX,
  URL_SERVER
}