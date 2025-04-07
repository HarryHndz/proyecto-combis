import { useState, useEffect, useMemo, useCallback } from "react";
import { VehicleUseCases } from "@/domain/useCases/vehiclesUseCases";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export const useVehiclesData = () => {
  const [vehicles, setVehicles] = useState<IRegisterVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);  // Estado para verificar si ya se cargaron los vehículos

  const vehicleRepository = useMemo(() => new VehicleRepository(), []);
  const vehicleUseCases = useMemo(() => new VehicleUseCases(vehicleRepository), [vehicleRepository]);

  const fetchVehicles = useCallback(async () => {
    if (isFetched || loading) return;  // Verifica si ya fue cargado o si está en proceso de carga
    setLoading(true);
    try {
      const response: IRegisterVehicle[] = await vehicleUseCases.getVehicles();

      if (Array.isArray(response)) {
        const formattedVehicles = response.map((vehiculo) => ({
          id_vehiculos: vehiculo.id_vehiculos,
          numero: vehiculo.numero,
          matricula: vehiculo.matricula,
          activo: vehiculo.activo,
        }));

        setVehicles(formattedVehicles);
        setIsFetched(true);  // Marcar como cargados
      } else {
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch {
      setError("Error al obtener vehículos");
    } finally {
      setLoading(false);
    }
  }, [vehicleUseCases, isFetched, loading]);  // Asegúrate de que no se dispare mientras se está cargando

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);  // Solo se ejecuta si fetchVehicles cambia

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
export default useVehiclesData;