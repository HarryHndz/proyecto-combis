import { AdminInterface } from "@/domain/repository/adminInterface";
import { ApiClient } from "@/data/apiClient";
import { IUserRes } from "@/domain/entities/IUserRes";
import { IGetDriver } from "@/domain/entities/IDriver";

export class AdminRepository implements AdminInterface {
  private httpClient;
  constructor() {
    this.httpClient = new ApiClient().getInstance();
  }

  async getDataUser(id: number): Promise<IUserRes> {
    try {
      const {data} = await this.httpClient.get(`/usuarios/${id}`)
      return data
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

  async getDataDriver(id: number): Promise<IGetDriver> {
    try {
      const response = await this.httpClient.get(`conductores/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
