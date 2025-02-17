import { AuthInterface } from "@/domain/repository/authInterface";
import { IRegister, ISession } from "../entities/IAuth";

import { AuthRepository } from "@/data/repository/authRepository";

export class AuthUseCases implements AuthInterface{
  private authRepository:AuthRepository
  constructor(repository:AuthRepository){
    this.authRepository = repository
  }
  async register(dataRegister: IRegister): Promise<void> {
    try {
      await this.authRepository.register(dataRegister)
    } catch (error) {
      throw error
    }
  }
  async login(dataSession: ISession): Promise<ISession> {
    try {
      return await this.authRepository.login(dataSession)
    } catch (error) {
      throw error
    }
  }
}

