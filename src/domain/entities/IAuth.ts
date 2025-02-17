import { IUserType } from "./IUserType";

export interface IRegister {
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

export interface IUser extends Omit<IRegister,'conditionsTerms'>{
  key:number
  token:string
}

export type ISession = Pick<IRegister,'email' | 'password'>


