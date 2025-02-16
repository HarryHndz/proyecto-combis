import { IUserType } from "@/data/interfaces/IUserType";
import { IValues } from "@/data/interfaces/IValues";

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

export {
  USERS,
  SEX
}