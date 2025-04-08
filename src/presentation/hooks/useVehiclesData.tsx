import { useState, useEffect, useMemo, useCallback } from "react";
import { VehicleUseCases } from "@/domain/useCases/vehiclesUseCases";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export const useVehiclesData = () => {
  const [vehicles, setVehicles] = useState<IRegisterVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Instanciamos los repositorios y casos de uso una sola vez
  const vehicleRepository = useMemo(() => new VehicleRepository(), []);
  const vehicleUseCases = useMemo(() => new VehicleUseCases(vehicleRepository), [vehicleRepository]);

  // Obtener todos los vehículos
  const fetchVehicles = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response: IRegisterVehicle[] = await vehicleUseCases.getVehicles();

      if (Array.isArray(response)) {
        // Puedes conservar todos los datos si necesitas más información
        setVehicles(response);
      } else {
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch (err: any) {
      setError(err.message || "Error al obtener vehículos");
    } finally {
      setLoading(false);
    }
  }, [loading, vehicleUseCases]);

  // Obtener los detalles de un vehículo específico
  const getVehicleDetails = useCallback(async (id: string): Promise<IRegisterVehicle | null> => {
    setLoading(true);
    setError(null);

    try {
      const details = await vehicleUseCases.getVehicleDetails(id);
      return details;
    } catch (err: any) {
      setError(err.message || "Error al obtener detalles del vehículo");
      return null;
    } finally {
      setLoading(false);
    }
  }, [vehicleUseCases]);

  // Registrar un nuevo vehículo
  const registerVehicle = async (vehicleData: Partial<IRegisterVehicle>) => {
    setLoading(true);
    setError(null);

    try {
      await vehicleUseCases.registerVehicle(vehicleData);
      await fetchVehicles();
    } catch (err: any) {
      setError(err.message || "Error al registrar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un vehículo existente
  const updateVehicle = async (id: string, vehicleData: Partial<IRegisterVehicle>) => {
    setLoading(true);
    setError(null);

    try {
      await vehicleUseCases.updateVehicle(id, vehicleData);
      await fetchVehicles();
    } catch (err: any) {
      setError(err.message || "Error al actualizar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un vehículo
  const deleteVehicle = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await vehicleUseCases.deleteVehicle(id);
      await fetchVehicles();
    } catch (err: any) {
      setError(err.message || "Error al eliminar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial de vehículos
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading,
    error,
    registerVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleDetails,
    fetchVehicles, // Puedes usar esto como refetch
  };
};

export default useVehiclesData;
