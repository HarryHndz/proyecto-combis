import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export class VehicleUseCases {
  private vehicleRepository: VehicleRepository;

  constructor(repository: VehicleRepository) {
    this.vehicleRepository = repository;
  }

  async registerVehicle(dataRegister: Partial<IRegisterVehicle>): Promise<void> {
    const completeData: IRegisterVehicle = {
      numero: dataRegister.numero ?? "", 
      matricula: dataRegister.matricula ?? "", 
      id_dueno: dataRegister.id_dueno ?? 1,
      id_ruta: dataRegister.id_ruta ?? undefined, 
    };
    console.log("🚀 Datos enviados al backend:", completeData);
  
    return this.vehicleRepository.registerVehicle(completeData);
  }
  
  async getVehicles(): Promise<IRegisterVehicle[]> {
    const response = await this.vehicleRepository.getVehicles();
    return response.map((vehicle) => ({
      //id: vehicle.id_vehiculos.toString(), // Aseguramos que el ID esté presente
      numero: vehicle.numero,
      matricula: vehicle.matricula,
      id_dueno: vehicle.id_dueno,
      id_ruta: vehicle.id_ruta,
      ruta_nombre: vehicle.rutas?.nombre ?? "",
      activo: vehicle.rutas?.activo ?? false,
      id_vehiculos: vehicle.id_vehiculos, // Agregamos la propiedad faltante
    }));
  }
  

  async getVehicleDetails(id: string): Promise<IRegisterVehicle> {
    const response = await this.vehicleRepository.getVehicleById(id);
    return {
      //id: response.id_vehiculos.toString(),
      numero: response.numero,
      matricula: response.matricula,
      id_dueno: response.id_dueno,
      id_ruta: response.id_ruta,
      ruta_nombre: response.rutas?.nombre ?? "",
      activo: response.rutas?.activo ?? false,
      id_vehiculos: response.id_vehiculos, // Ensure id_vehiculos is included
    };
  }

  async updateVehicle(id: string, data: Partial<IRegisterVehicle>): Promise<void> {
    const completeData: IRegisterVehicle = {
      id: data.id ?? "",
      numero: data.numero ?? "",
      matricula: data.matricula ?? "",
      id_dueno: data.id_dueno ?? 0,
      id_ruta: data.id_ruta ?? 0,
      ruta_nombre: data.ruta_nombre ?? "",
      activo: data.activo ?? false,
      id_vehiculos: 0
    };
    return this.vehicleRepository.updateVehicle(id, completeData);
  }

  async deleteVehicle(id: string): Promise<void> {
    return this.vehicleRepository.deleteVehicle(id);
  }
}
