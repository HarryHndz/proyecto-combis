import { LocalStoreRepository } from "@/data/repository/localRepository";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase";
import { IUser } from "../entities/IAuth";

export class VehicleUseCases {
  private vehicleRepository: VehicleRepository;
  private localStoreUseCase: LocalStoreUseCase<IUser>;

  constructor(repository: VehicleRepository) {
    this.vehicleRepository = repository;
    this.localStoreUseCase = new LocalStoreUseCase<IUser>(new LocalStoreRepository());
  }

  private getUserId(): number {
    const userId = this.localStoreUseCase.get('user');
    if (!userId) {
      throw new Error("El usuario no ha iniciado sesión");
    }
    return userId.id;
  }

  private createVehicleData(dataRegister: Partial<IRegisterVehicle>, id: number): IRegisterVehicle {
    return {
      numero: dataRegister.numero || "",
      matricula: dataRegister.matricula || "",
      id_dueno: id,
      id_ruta: dataRegister.id_ruta ?? undefined,
    };
  }

  async registerVehicle(dataRegister: Partial<IRegisterVehicle>): Promise<void> {
    const userId = this.getUserId();
    const completeData = this.createVehicleData(dataRegister, userId);

    if (!completeData.numero || !completeData.matricula) {
      throw new Error("Número y matrícula son obligatorios.");
    }

    return this.vehicleRepository.registerVehicle(completeData);
  }

  async getVehicles(): Promise<IRegisterVehicle[]> {
    const userId = this.getUserId();
    const response = await this.vehicleRepository.getVehicles();
    return response.filter(vehicle => vehicle.id_dueno === userId);
  }

  async getVehicleDetails(id: string): Promise<IRegisterVehicle> {
    const response = await this.vehicleRepository.getVehicleById(id);
    return {
      id_vehiculos: typeof response.id_vehiculos === "number" ? response.id_vehiculos : undefined,
      numero: response.numero ?? "",
      matricula: response.matricula ?? "",
      id_dueno: response.id_dueno ?? 0,
      id_ruta: response.id_ruta ?? 0,
      ruta_nombre: response.rutas?.nombre ?? "",
      activo: response.rutas?.activo ?? false,
    };
  }

  async updateVehicle(id: string, data: Partial<IRegisterVehicle>): Promise<void> {
    const userId = this.getUserId();
    const completeData = this.createVehicleData(data, userId);
    completeData.id_vehiculos = typeof data.id_vehiculos === "string" ? parseInt(data.id_vehiculos, 10) : data.id_vehiculos ?? parseInt(id, 10);

    return this.vehicleRepository.updateVehicle(id, completeData);
  }

  async deleteVehicle(id: string): Promise<void> {
    this.getUserId(); 
    return this.vehicleRepository.deleteVehicle(id);
  }
}
