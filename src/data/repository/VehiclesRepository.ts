import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import { ApiClient } from "@/data/apiClient";

export class VehicleRepository {
  private httpClient;

  constructor() {
    this.httpClient = new ApiClient().getInstance();
  }

  // Método para registrar un vehículo
  async registerVehicle(dataRegister: IRegisterVehicle): Promise<void> {
    try {
      await this.httpClient.post('/vehiculos', {
        numero: dataRegister.numero,
        matricula: dataRegister.matricula,
        id_dueno: dataRegister.id_dueno,
        id_ruta: dataRegister.id_ruta,
      });
    } catch (error) {
      this.handleError(error, "registrar el vehículo");
    }
  }

  // Método para obtener todos los vehículos
  async getVehicles(): Promise<IRegisterVehicle[]> {
    try {
      console.log("📡 Solicitando vehículos...");
      const response = await this.httpClient.get('/vehiculos');
      
      console.log("✅ Respuesta recibida:", response); // Verifica todo el objeto response
      console.log("📊 Datos recibidos:", response.data); // Verifica los datos específicos
  
      return response.data.data;
    } catch (error) {
      this.handleError(error, "obtener los vehículos");
      return [];
    }
  }
  
  // Método para obtener los detalles de un vehículo específico
  async getVehicleById(id: string): Promise<IRegisterVehicle> {
    try {
      const response = await this.httpClient.get(`/vehiculos/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error, `obtener los detalles del vehículo ${id}`);
      return {} as IRegisterVehicle; // Retorna un objeto vacío si hay un error
    }
  }

  // Método para actualizar un vehículo
  async updateVehicle(id: string, updatedData: IRegisterVehicle): Promise<void> {
    try {
      await this.httpClient.put(`/vehiculos/${id}`, {
        numero: updatedData.numero,
        matricula: updatedData.matricula,
        id_dueno: updatedData.id_dueno,
        id_ruta: updatedData.id_ruta,
        ruta_nombre: updatedData.ruta_nombre,
        activo: updatedData.activo,
      });
    } catch (error) {
      this.handleError(error, `actualizar el vehículo ${id}`);
    }
  }

  // Método para eliminar un vehículo
  async deleteVehicle(id: string): Promise<void> {
    try {
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
      if (error instanceof Error) {
        console.error(`Error desconocido al ${action}:`, error.message);
      } else {
        console.error(`Error desconocido al ${action}:`, error);
      }
      throw new Error(`Error inesperado al ${action}`);
    }
  }
}
