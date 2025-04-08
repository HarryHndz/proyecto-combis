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

const URL_SERVER = 'http://localhost:3000/'
const ACCESS_TOKEN = 'pk.eyJ1IjoiaGFycnloZHplMSIsImEiOiJjbTk2OGU3b2gxZnZjMmtvaHJxM3VzZ3diIn0.5GBNaTKCKTgtxd_JmKG31A'

export {
  USERS,
  SEX,
  URL_SERVER,
  ACCESS_TOKEN
}