import { AdminInterface } from "@/domain/repository/adminInterface";
import { ApiClient } from "@/data/apiClient";
import { IRegisterDriver } from "@/domain/entities/IDriver";
import { IUserRes } from "@/domain/entities/IUserRes";
import { IGetDriver } from "@/domain/entities/IDriver";

export class AdminRepository implements AdminInterface {
  private httpClient;
  constructor() {
    this.httpClient = new ApiClient().getInstance();
  }

  async add(dataNew: IRegisterDriver): Promise<void> {
    console.log(dataNew);
  }

  async getDataUser(id: number): Promise<IUserRes> {
    try {
      const response: IUserRes = await this.httpClient.get(`/usuarios/${id}`)
      return response
    } catch (error) {
      throw error
    }
  }

  async getChoferes(): Promise<IGetDriver> {
    try {
      const response = await this.httpClient.get(`conductores`)
      return response.data
    } catch (error) {
      throw error
    }
  }


}
