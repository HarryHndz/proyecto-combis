import { LocalStoreRepository } from "@/data/repository/localRepository";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase"; // Asegúrate de importar el caso de uso
import { IUser } from "../entities/IAuth";

export class VehicleUseCases {
  private vehicleRepository: VehicleRepository;
  private localStoreUseCase: LocalStoreUseCase<IUser>;

  constructor(repository: VehicleRepository) {
    this.vehicleRepository = repository;
    this.localStoreUseCase = new LocalStoreUseCase<IUser>(new LocalStoreRepository())
  }

  // Método para registrar un vehículo
  async registerVehicle(dataRegister: Partial<IRegisterVehicle>): Promise<void> {
    const userId = this.localStoreUseCase.get('user');
    if (!userId) {
      throw new Error("El usuario no ha iniciado sesión");
    }

    const completeData: IRegisterVehicle = {
      numero: dataRegister.numero || "",
      matricula: dataRegister.matricula || "",
      id_dueno: userId.id,
      id_ruta: dataRegister.id_ruta ?? undefined,
    };

    // Validación adicional aquí, si es necesario
    if (!completeData.numero || !completeData.matricula) {
      throw new Error("Número y matrícula son obligatorios.");
    }

    return this.vehicleRepository.registerVehicle(completeData);
  }

  // Obtener todos los vehículos del dueño
  async getVehicles(): Promise<IRegisterVehicle[]> {
    const userId = this.localStoreUseCase.get('user');
    if (!userId) {
      throw new Error("El usuario no ha iniciado sesión");
    }

    const response = await this.vehicleRepository.getVehicles();
    return response.filter(vehicle => vehicle.id_dueno === userId.id);
  }

  // Obtener detalles de un vehículo
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

  // Actualizar los datos de un vehículo
  async updateVehicle(id: string, data: Partial<IRegisterVehicle>): Promise<void> {
    const userId = this.localStoreUseCase.get('user');
    if (!userId) {
      throw new Error("El usuario no ha iniciado sesión");
    }

    const completeData: IRegisterVehicle = {
      id_vehiculos: typeof data.id_vehiculos === "string" ? parseInt(data.id_vehiculos, 10) : data.id_vehiculos ?? parseInt(id, 10),
      numero: data.numero ?? "",
      matricula: data.matricula ?? "",
      id_dueno: userId.id,
      id_ruta: data.id_ruta ?? 0,
      ruta_nombre: data.ruta_nombre ?? "",
      activo: data.activo ?? false,
    };

    return this.vehicleRepository.updateVehicle(id, completeData);
  }

  // Eliminar un vehículo
  async deleteVehicle(id: string): Promise<void> {
    const userId = this.localStoreUseCase.get('user');
    if (!userId) {
      throw new Error("El usuario no ha iniciado sesión");
    }

    return this.vehicleRepository.deleteVehicle(id);
  }
}
