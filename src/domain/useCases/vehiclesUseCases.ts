import { LocalStoreRepository } from "@/data/repository/localRepository";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase";
import { IUser } from "../entities/IAuth";

export class VehicleUseCases {
  private vehicleRepository: VehicleRepository;
  private localStoreUseCase: LocalStoreUseCase<IUser>;

  constructor(vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository;
    this.localStoreUseCase = new LocalStoreUseCase<IUser>(new LocalStoreRepository());
  }

  private getUserId(): number {
    const user = this.localStoreUseCase.get("user");
    if (!user) {
      throw new Error("El usuario no ha iniciado sesión");
    }
    return user.id;
  }

  private createVehicleData(dataRegister: Partial<IRegisterVehicle>, userId: number): IRegisterVehicle {
    return {
      numero: dataRegister.numero || "",
      matricula: dataRegister.matricula || "",
      id_dueno: userId,
      id_ruta: dataRegister.id_ruta ?? undefined,
    };
  }


 // En vehiclesUseCases.ts, modifica el método registerVehicle:
async registerVehicle(dataRegister: Partial<IRegisterVehicle>): Promise<void> {
  try {
    const userId = dataRegister.id_dueno || this.getUserId();
    
    // Asegúrate de que los tipos coincidan con la interfaz
    const completeData: IRegisterVehicle = {
      numero: dataRegister.numero || "",
      matricula: dataRegister.matricula || "",
      id_dueno: Number(userId), // Convertir a número si es string
      id_ruta: dataRegister.id_ruta ? Number(dataRegister.id_ruta) : undefined,
    };
    
    console.log("🚀 Datos completos que se enviarán al servidor:", completeData);
    
    if (!completeData.numero || !completeData.matricula) {
      throw new Error("Número y matrícula son obligatorios.");
    }

    await this.vehicleRepository.registerVehicle(completeData);
  } catch (error) {
    console.error("Error al registrar el vehículo:", error);
    throw error;
  }
}
  // Método para obtener los vehículos del usuario
  async getVehicles(): Promise<IRegisterVehicle[]> {
    try {
      const userId = this.getUserId();
      return await this.vehicleRepository.getVehicles(userId);
    } catch (error) {
      console.error("Error al obtener los vehículos:", error);
      throw error;
    }
  }

  // Método para obtener los detalles de un vehículo específico
  async getVehicleDetails(id: string): Promise<IRegisterVehicle> {
    try {
      const response = await this.vehicleRepository.getVehicleById(id);
      return {
        id_vehiculos: typeof response.id_vehiculos === "number" ? response.id_vehiculos : undefined,
        numero: response.numero ?? "",
        matricula: response.matricula ?? "",
        id_dueno: response.id_dueno ?? 0,
        id_ruta: response.id_ruta ?? 0,
        rutas: response.rutas ?? undefined,
        activo: response.activo ?? undefined,
      };
    } catch (error) {
      console.error("Error al obtener detalles del vehículo:", error);
      throw error;
    }
  }

  // Método para actualizar un vehículo
  async updateVehicle(id: string, data: Partial<IRegisterVehicle>): Promise<void> {
    try {
      const userId = this.getUserId();
      const completeData = this.createVehicleData(data, userId);
      completeData.id_vehiculos = typeof data.id_vehiculos === "string"
        ? parseInt(data.id_vehiculos, 10)
        : data.id_vehiculos ?? parseInt(id, 10);

      await this.vehicleRepository.updateVehicle(id, completeData);
    } catch (error) {
      console.error("Error al actualizar el vehículo:", error);
      throw error;
    }
  }

  async deleteVehicle(id: string): Promise<void> {
    try {
      await this.vehicleRepository.deleteVehicle(id);
      console.log("🚀 Vehículo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
      throw new Error(`No se pudo eliminar el vehículo con id ${id}`);
    }
  }
}  