import { AdminInterface } from "@/domain/repository/adminInterface";
import { AdminRepository } from "@/data/repository/adminRepository";
import { IUserRes } from "../entities/IUserRes";
import { IGetDriver } from "../entities/IDriver";

export class AdminUseCases implements AdminInterface {
  private adminRepository:AdminRepository
  constructor(repository:AdminRepository){
    this.adminRepository = repository
  }

  async add(dataNew: any): Promise<void> {
    try {
      await this.adminRepository.add(dataNew)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getDataUser(id: number): Promise<IUserRes>{
    try {
      return await this.adminRepository.getDataUser(id)
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async getChoferes(): Promise<IGetDriver> {
    try {
      return await this.adminRepository.getChoferes()
    } catch (error) {
      throw error
    }
  }

  async getDataDriver(id: number): Promise<IGetDriver> {
    try {
      return await this.adminRepository.getDataDriver(id)
    } catch (error) {
      throw error
    }
  }
}