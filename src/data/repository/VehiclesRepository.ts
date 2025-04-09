import { IRegisterVehicle } from "@/domain/entities/IVehicles";
import { ApiClient } from "@/data/apiClient";

export class VehicleRepository {
  private httpClient;

  constructor() {
    this.httpClient = new ApiClient().getInstance();
  }

  async registerVehicle(dataRegister: IRegisterVehicle): Promise<void> {
    try {
      const user = await this.httpClient.get(`/duenos/usuario/${dataRegister.id_dueno}`);
      console.log("user", user);

      const response = await this.httpClient.post("/vehiculos", {
        id_dueno: user.data.data.id_dueno,
        id_ruta: dataRegister.id_ruta,
        numero: dataRegister.numero,
        matricula: dataRegister.matricula,
      });
      console.log("🚀 Response del servidor:", response);

      if (response.status === 201) {
        console.log("Vehículo registrado correctamente");
      } else {
        throw new Error("Error en el registro del vehículo.");
      }
    } catch (error) {
      this.handleError(error, "registrar el vehículo");
    }
  }

  async getVehicles(userId: number): Promise<IRegisterVehicle[]> {
    try {
      const userResponse = await this.httpClient.get(`/duenos/usuario/${userId}`);
      const duenoId = userResponse.data.data.id_dueno;
      
      const vehiclesResponse = await this.httpClient.get(`/vehiculos/dueno/${duenoId}`);
      console.log("🚀 Vehículos obtenidos:", vehiclesResponse);
      
      return vehiclesResponse.data.data;
    } catch (error) {
      this.handleError(error, "obtener los vehículos");
    }
  }

  async getVehicleById(id: string): Promise<IRegisterVehicle> {
    try {
      const response = await this.httpClient.get(`/vehiculos/${id}`);
      return response.data.data; // <- Aquí extraes solo la data útil
    } catch (error) {
      this.handleError(error, `obtener los detalles del vehículo ${id}`);
    }
  }
  

  async updateVehicle(id: string, updatedData: IRegisterVehicle): Promise<void> {
    try {
      // Obtener la información del dueño antes de hacer la actualización
      const user = await this.httpClient.get(`/duenos/usuario/${updatedData.id_dueno}`);
      console.log("User info:", user);
  
      // Hacer la actualización del vehículo con la información del dueño
      const response = await this.httpClient.patch(`/vehiculos/${id}`, {
        id_dueno: user.data.data.id_dueno,
        id_ruta: updatedData.id_ruta,
        numero: updatedData.numero,
        matricula: updatedData.matricula,
      });
  
      console.log("🚀 Vehículo actualizado correctamente:", response);
  
      if (response.status === 200) {
        console.log("Vehículo actualizado correctamente");
      } else {
        throw new Error("Error en la actualización del vehículo.");
      }
    } catch (error) {
      this.handleError(error, `actualizar el vehículo ${id}`);
    }
  }

    async deleteVehicle(id: string): Promise<void> {
      try {
        // Eliminamos el vehículo directamente sin ninguna validación adicional
        const response = await this.httpClient.delete(`/vehiculos/${id}`);
        if (response.status === 200) {
          console.log("🚀 Vehículo eliminado correctamente desde el repositorio");
        } else {
          throw new Error("Error al eliminar el vehículo desde el repositorio.");
        }
      } catch (error) {
        this.handleError(error, `eliminar el vehículo ${id} desde el repositorio`);
        throw error;  // Lanzar el error para que el use case lo maneje
      }
    }

  private handleError(error: any, action: string): never {
    console.error(`Error al ${action}:`, error);
    throw new Error(`Error al ${action}: ${error.message || "desconocido"}`);
  }
}
