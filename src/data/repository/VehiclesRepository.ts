import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import { ApiClient } from "@/data/apiClient";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase";
import { LocalStoreRepository } from "@/data/repository/localRepository";

export class VehicleRepository {
  private httpClient;
  private localStoreUseCase: LocalStoreUseCase<any>;

  constructor(localStoreUseCase: LocalStoreUseCase<any> = new LocalStoreUseCase(new LocalStoreRepository()), httpClient: ApiClient = new ApiClient()) {
    this.httpClient = httpClient;
    this.localStoreUseCase = localStoreUseCase;
  }

  // Método para obtener el id del dueño de forma centralizada
  private getOwnerId(): number | null {
    const userId = this.localStoreUseCase.get(1);
    if (!userId) {
      throw new Error("El usuario no ha iniciado sesión");
    }
    return userId;
  }

  // Método para registrar un vehículo
  async registerVehicle(dataRegister: IRegisterVehicle): Promise<void> {
    try {
      const userId = this.getOwnerId(); // Obtener id del dueño
      await this.httpClient.post('/vehiculos', {
        ...dataRegister,
        id_dueno: userId,
      });
    } catch (error) {
      this.handleError(error, "registrar el vehículo");
    }
  }

  // Método para obtener todos los vehículos del dueño
  async getVehicles(): Promise<IRegisterVehicle[]> {
    try {
      const userId = this.getOwnerId();
      const response = await this.httpClient.get(`/vehiculos?dueno_id=${userId}`);
      return response.data.data;
    } catch (error) {
      this.handleError(error, "obtener los vehículos");
      return [];
    }
  }

  // Método para obtener un vehículo específico por ID
  async getVehicleById(id: string): Promise<IRegisterVehicle> {
    try {
      const userId = this.getOwnerId();
      const response = await this.httpClient.get(`/vehiculos/${id}`);
      if (response.data.id_dueno !== userId) {
        throw new Error("Este vehículo no pertenece al usuario");
      }
      return response.data;
    } catch (error) {
      this.handleError(error, `obtener los detalles del vehículo ${id}`);
      return {} as IRegisterVehicle;
    }
  }

  // Método para actualizar un vehículo
  async updateVehicle(id: string, updatedData: IRegisterVehicle): Promise<void> {
    try {
      const userId = this.getOwnerId();
      await this.httpClient.put(`/vehiculos/${id}`, {
        ...updatedData,
        id_dueno: userId,
      });
    } catch (error) {
      this.handleError(error, `actualizar el vehículo ${id}`);
    }
  }

  // Método para eliminar un vehículo
  async deleteVehicle(id: string): Promise<void> {
    try {
      const userId = this.getOwnerId();
      const vehicle = await this.getVehicleById(id);
      if (vehicle.id_dueno !== userId) {
        throw new Error("Este vehículo no pertenece al usuario");
      }
      await this.httpClient.delete(`/vehiculos/${id}`);
    } catch (error) {
      this.handleError(error, `eliminar el vehículo ${id}`);
    }
  }

  // Maneja errores comunes
  private handleError(error: any, action: string): void {
    if (error instanceof Error && (error as any).response) {
      console.error(`Error al ${action}:`, (error as any).response.data);
      throw new Error(`Error en el servidor: ${(error as any).response.status}`);
    } else if (error instanceof Error && (error as any).request) {
      console.error(`No se recibió respuesta del servidor al ${action}:`, (error as any).request);
      throw new Error('Error de red: No se pudo conectar con el servidor');
    } else {
      console.error(`Error desconocido al ${action}:`, error);
      throw new Error(`Error inesperado al ${action}`);
    }
  }
}
