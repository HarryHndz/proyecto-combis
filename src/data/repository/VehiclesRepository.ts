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
        imagen: dataRegister.image,
      });
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        console.error('Error al registrar el vehículo:', (error as any).response.data);
        throw new Error(`Error en el servidor: ${(error as any).response.status}`);
      } else if (error instanceof Error && (error as any).request) {
        console.error('No se recibió respuesta del servidor:', (error as any).request);
        throw new Error('Error de red: No se pudo conectar con el servidor');
      } else {
        console.error('Error desconocido:', (error as Error).message);
        throw new Error('Error inesperado al registrar el vehículo');
      }
    }
  }

  // Método para obtener todos los vehículos
  async getVehicles(): Promise<IRegisterVehicle[]> {
    try {
      const response = await this.httpClient.get('/vehiculos');
      return response.data;
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        console.error("Error al obtener los vehículos:", (error as any).response.data);
        throw new Error(`Error en el servidor: ${(error as any).response?.status}`);
      } else if (error instanceof Error && (error as any).request) {
        console.error("No se recibió respuesta del servidor:", (error as any).request);
        throw new Error("Error de red: No se pudo conectar con el servidor");
      } else {
        if (error instanceof Error) {
          console.error("Error desconocido:", error.message);
        } else {
          console.error("Error desconocido:", error);
        }
        throw new Error("Error inesperado al obtener los vehículos");
      }
    }
  }

  // Método para obtener los detalles de un vehículo específico
  async getVehicleById(id: string): Promise<IRegisterVehicle> {
    try {
      const response = await this.httpClient.get(`/vehiculos/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        console.error(`Error al obtener los detalles del vehículo ${id}:`, (error as any).response.data);
        throw new Error(`Error en el servidor al obtener el vehículo: ${(error as any).response.status}`);
      } else if (error instanceof Error && (error as any).request) {
        console.error(`No se recibió respuesta del servidor al obtener el vehículo ${id}:`, (error as any).request);
        throw new Error('Error de red: No se pudo conectar con el servidor');
      } else {
        if (error instanceof Error) {
          console.error("Error desconocido al obtener detalles del vehículo:", error.message);
        } else {
          console.error("Error desconocido al obtener detalles del vehículo:", error);
        }
        throw new Error("Error inesperado al obtener detalles del vehículo");
      }
    }
  }

  // Método para actualizar un vehículo
  async updateVehicle(id: string, updatedData: IRegisterVehicle): Promise<void> {
    try {
      await this.httpClient.put(`/vehiculos/${id}`, {
        numero: updatedData.numero,
        matricula: updatedData.matricula,
        imagen: updatedData.image,
      });
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        console.error(`Error al actualizar el vehículo ${id}:`, (error as any).response.data);
        throw new Error(`Error en el servidor al actualizar el vehículo: ${(error as any).response.status}`);
      } else if (error instanceof Error && (error as any).request) {
        console.error(`No se recibió respuesta del servidor al actualizar el vehículo ${id}:`, (error as any).request);
        throw new Error('Error de red: No se pudo conectar con el servidor');
      } else {
        if (error instanceof Error) {
          console.error("Error desconocido al actualizar el vehículo:", error.message);
        } else {
          console.error("Error desconocido al actualizar el vehículo:", error);
        }
        throw new Error("Error inesperado al actualizar el vehículo");
      }
    }
  }

  // Método para eliminar un vehículo
  async deleteVehicle(id: string): Promise<void> {
    try {
      await this.httpClient.delete(`/vehiculos/${id}`);
    } catch (error) {
      if (error instanceof Error && (error as any).response) {
        console.error(`Error al eliminar el vehículo ${id}:`, (error as any).response.data);
        throw new Error(`Error en el servidor al eliminar el vehículo: ${(error as any).response.status}`);
      } else if (error instanceof Error && (error as any).request) {
        console.error(`No se recibió respuesta del servidor al eliminar el vehículo ${id}:`, (error as any).request);
        throw new Error('Error de red: No se pudo conectar con el servidor');
      } else {
        if (error instanceof Error) {
          console.error("Error desconocido al eliminar el vehículo:", error.message);
        } else {
          console.error("Error desconocido al eliminar el vehículo:", error);
        }
        throw new Error("Error inesperado al eliminar el vehículo");
      }
    }
  }
}
