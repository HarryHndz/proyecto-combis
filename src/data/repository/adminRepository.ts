import { AdminInterface } from "@/domain/repository/adminInterface";
import { ApiClient } from "@/data/apiClient";
import { IRegisterDriver } from "@/domain/entities/IDriver";

export class AdminRepository implements AdminInterface {
  private httpClient;
  constructor() {
    this.httpClient = new ApiClient().getInstance();
  }

  async add(dataNew: IRegisterDriver): Promise<void> {
    console.log(dataNew);
  }
}
