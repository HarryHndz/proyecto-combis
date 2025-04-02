import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export class VehicleUseCases {
  private vehicleRepository: VehicleRepository;

  constructor(repository: VehicleRepository) {
    this.vehicleRepository = repository;
  }

  async registerVehicle(dataRegister: Partial<IRegisterVehicle>): Promise<void> {
    const completeData: IRegisterVehicle = {
      id: dataRegister.id ?? "",
      numero: dataRegister.numero ?? "",
      matricula: dataRegister.matricula ?? "",
      image: dataRegister.image ?? null,
    };
    return this.vehicleRepository.registerVehicle(completeData);
  }

  async getVehicles(): Promise<IRegisterVehicle[]> {
    return this.vehicleRepository.getVehicles();
  }

  async getVehicleDetails(id: string): Promise<IRegisterVehicle> {
    return this.vehicleRepository.getVehicleById(id);
  }

  async updateVehicle(id: string, data: Partial<IRegisterVehicle>): Promise<void> {
    const completeData: IRegisterVehicle = {
      id: data.id ?? "",
      numero: data.numero ?? "",
      matricula: data.matricula ?? "",
      image: data.image ?? null,
    };
    return this.vehicleRepository.updateVehicle(id, completeData);
  }

  async deleteVehicle(id: string): Promise<void> {
    return this.vehicleRepository.deleteVehicle(id);
  }
}
