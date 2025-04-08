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

const URL_SERVER = 'https://vwwrmpcj-3000.usw3.devtunnels.ms/'
const ACCESS_TOKEN = 'pk.eyJ1IjoiaGFycnloZHplMSIsImEiOiJjbTk2OGU3b2gxZnZjMmtvaHJxM3VzZ3diIn0.5GBNaTKCKTgtxd_JmKG31A'

export {
  USERS,
  SEX,
  URL_SERVER,
  ACCESS_TOKEN
}