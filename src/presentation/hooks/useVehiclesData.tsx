import { useState, useEffect, useMemo, useCallback } from "react";
import { VehicleUseCases } from "@/domain/useCases/vehiclesUseCases";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export const useVehiclesData = () => {
  const [vehicles, setVehicles] = useState<IRegisterVehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicleRepository = useMemo(() => new VehicleRepository(), []);
  const vehicleUseCases = useMemo(() => new VehicleUseCases(vehicleRepository), [vehicleRepository]);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await vehicleUseCases.getVehicles();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Error al obtener vehículos");
    } finally {
      setLoading(false);
    }
  }, [vehicleUseCases]);

  const getVehicleDetails = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      return await vehicleUseCases.getVehicleDetails(id);
    } catch (err: any) {
      setError(err.message || "Error al obtener detalles");
      return null;
    } finally {
      setLoading(false);
    }
  }, [vehicleUseCases]);

  const registerVehicle = async (vehicleData: Partial<IRegisterVehicle>) => {
    setLoading(true);
    setError(null);

    try {
      await vehicleUseCases.registerVehicle(vehicleData);
      await fetchVehicles();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al registrar vehículo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id: string, data: Partial<IRegisterVehicle>) => {
    setLoading(true);
    setError(null);

    try {
      await vehicleUseCases.updateVehicle(id, data);
      await fetchVehicles();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al actualizar vehículo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await vehicleUseCases.deleteVehicle(id);
      await fetchVehicles();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al eliminar vehículo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    getVehicleDetails,
    registerVehicle,
    updateVehicle,
    deleteVehicle,
  };
};

export default useVehiclesData;
