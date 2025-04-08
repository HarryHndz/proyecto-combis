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
  userType: string
  curp?: string
  rfc?: string
}

export interface IUser extends Pick<IRegister,'username'>{
  id:number
  token:string
  idTypeUser:number

}

export type ISession = Pick<IRegister,'username' | 'password'>


