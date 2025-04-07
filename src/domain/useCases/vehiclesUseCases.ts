import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export class VehicleUseCases {
  private vehicleRepository: VehicleRepository;

  constructor(repository: VehicleRepository) {
    this.vehicleRepository = repository;
  }

  // Método para registrar un vehículo con valores predeterminados si es necesario
  async registerVehicle(dataRegister: Partial<IRegisterVehicle>): Promise<void> {
    // Aseguramos que todos los campos importantes tengan un valor por defecto si no se pasan
    const completeData: IRegisterVehicle = {
      numero: dataRegister.numero || "", 
      matricula: dataRegister.matricula || "", 
      id_dueno: dataRegister.id_dueno ?? 1, // Asignamos 1 como valor por defecto
      id_ruta: dataRegister.id_ruta ?? undefined, // Puede ser undefined si no es necesario
    };

    console.log("🚀 Datos enviados al backend:", completeData);

    // Pasamos los datos completos al repositorio para su registro
    return this.vehicleRepository.registerVehicle(completeData);
  }

  // Obtener todos los vehículos
  async getVehicles(): Promise<IRegisterVehicle[]> {
    const response = await this.vehicleRepository.getVehicles();
    return response.map((vehicle) => ({
      id_vehiculos: typeof vehicle.id_vehiculos === "number" ? vehicle.id_vehiculos : undefined,
      numero: vehicle.numero ?? "",
      matricula: vehicle.matricula ?? "",
      id_dueno: vehicle.id_dueno ?? 0,
      id_ruta: vehicle.id_ruta ?? 0,
      ruta_nombre: vehicle.rutas?.nombre ?? "",
      activo: vehicle.rutas?.activo ?? false,
    }));
  }

  // Obtener los detalles de un vehículo específico por ID
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
    const completeData: IRegisterVehicle = {
      id_vehiculos: typeof data.id_vehiculos === "string" ? parseInt(data.id_vehiculos, 10) : data.id_vehiculos ?? parseInt(id, 10), // Convertimos a número si es string
      numero: data.numero ?? "",
      matricula: data.matricula ?? "",
      id_dueno: data.id_dueno ?? 0,
      id_ruta: data.id_ruta ?? 0,
      ruta_nombre: data.ruta_nombre ?? "",
      activo: data.activo ?? false,
    };

    return this.vehicleRepository.updateVehicle(id, completeData);
  }

  // Eliminar un vehículo
  async deleteVehicle(id: string): Promise<void> {
    return this.vehicleRepository.deleteVehicle(id);
  }
}
