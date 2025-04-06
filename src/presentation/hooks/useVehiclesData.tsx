import { useState, useEffect, useMemo, useCallback } from "react";
import { VehicleUseCases } from "@/domain/useCases/vehiclesUseCases";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export const useVehiclesData = () => {
  const [vehicles, setVehicles] = useState<IRegisterVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const vehicleUseCases = useMemo(() => {
    const vehicleRepository = new VehicleRepository();
    return new VehicleUseCases(vehicleRepository);
  }, []);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const response: IRegisterVehicle[] = await vehicleUseCases.getVehicles();

      if (Array.isArray(response)) {
        // Transformamos los datos para DataGrid (mostrando solo los campos necesarios)
        const formattedVehicles = response.map((vehiculo) => ({
          id_vehiculos: vehiculo.id_vehiculos,
          numero: vehiculo.numero,
          matricula: vehiculo.matricula,
          activo: vehiculo.activo,
          //ruta_nombre: vehiculo.ruta_nombre,
          //id_dueno: vehiculo.id_dueno, 
          //id_ruta: vehiculo.id_ruta,
        }));

        setVehicles(formattedVehicles);
      } else {
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch {
      setError("Error al obtener vehículos");
    } finally {
      setLoading(false);
    }
  }, [vehicleUseCases]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const registerVehicle = async (vehicleData: Partial<IRegisterVehicle>) => {
    setLoading(true);
    try {
      await vehicleUseCases.registerVehicle(vehicleData);
      await fetchVehicles();
    } catch {
      setError("Error al registrar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id: string, vehicleData: Partial<IRegisterVehicle>) => {
    setLoading(true);
    try {
      await vehicleUseCases.updateVehicle(id, vehicleData);
      await fetchVehicles();
    } catch {
      setError("Error al actualizar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id: string) => {
    setLoading(true);
    try {
      await vehicleUseCases.deleteVehicle(id);
      await fetchVehicles();
    } catch {
      setError("Error al eliminar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicles,
    loading,
    error,
    registerVehicle,
    updateVehicle,
    deleteVehicle,
    fetchVehicles,
  };
};
