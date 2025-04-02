import { AdminInterface } from "@/domain/repository/adminInterface";
import { AdminRepository } from "@/data/repository/adminRepository";

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
}