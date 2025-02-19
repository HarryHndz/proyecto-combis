import { IUserType } from "./IUserType";

export interface IRegister {
  username:string,
  name: string
  paternalSurName: string
  maternalSurName: string
  gender: string
  date: string
  email: string
  password: string
  confirmPassword: string
  userType: IUserType
  curp?: string
  rfc?: string
  conditionsTerms: boolean
}

export interface IUser extends Pick<IRegister,'username'>{
  id:number
  token:string
  idTypeUser:number

}

export type ISession = Pick<IRegister,'username' | 'password'>


