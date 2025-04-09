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
  label:'Dueño de combi',
  value:'2'
  },
  {
  label:'Conductor',
  value:'3'
  },
  {
  label:'Checador',
  value:'4'
  },
]

const URL_SERVER = 'https://vwwrmpcj-3000.usw3.devtunnels.ms/'

export {
  USERS,
  SEX,
  URL_SERVER
}