import { useState, useEffect, useMemo, useCallback } from "react";
import { VehicleUseCases } from "@/domain/useCases/vehiclesUseCases";
import { VehicleRepository } from "@/data/repository/VehiclesRepository";
import { IRegisterVehicle } from "@/domain/entities/IVehicles";

export const useVehiclesData = () => {
  const [vehicles, setVehicles] = useState<IRegisterVehicle[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false); // solo para cargar lista
  const [loadingAction, setLoadingAction] = useState<boolean>(false); // para crear, editar, eliminar
  const [error, setError] = useState<string | null>(null);

  // Instanciar repositorio y casos de uso solo una vez
  const vehicleRepository = useMemo(() => new VehicleRepository(), []);
  const vehicleUseCases = useMemo(() => new VehicleUseCases(vehicleRepository), [vehicleRepository]);

  // Obtener todos los vehículos
  const fetchVehicles = useCallback(async (): Promise<void> => {
    if (loadingList) return;

    setLoadingList(true);
    setError(null);

    try {
      const response = await vehicleUseCases.getVehicles();
      if (Array.isArray(response)) {
        setVehicles(response);
      } else {
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch (err: any) {
      setError(err.message || "Error al obtener vehículos");
    } finally {
      setLoadingList(false);
    }
  }, [loadingList, vehicleUseCases]);

  // Obtener detalles de un vehículo
  const getVehicleDetails = useCallback(async (id: string): Promise<IRegisterVehicle | null> => {
    setLoadingAction(true);
    setError(null);

    try {
      const details = await vehicleUseCases.getVehicleDetails(id);
      return details;
    } catch (err: any) {
      setError(err.message || "Error al obtener detalles del vehículo");
      return null;
    } finally {
      setLoadingAction(false);
    }
  }, [vehicleUseCases]);

  // Registrar nuevo vehículo
  const registerVehicle = async (vehicleData: Partial<IRegisterVehicle>): Promise<boolean> => {
    setLoadingAction(true);
    setError(null);

    try {
      if (!vehicleData.id_dueno) {
        throw new Error("Falta el ID del dueño del vehículo");
      }

      await vehicleUseCases.registerVehicle(vehicleData);
      await fetchVehicles();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al registrar el vehículo");
      return false;
    } finally {
      setLoadingAction(false);
    }
  };

  // Actualizar vehículo
  const updateVehicle = async (id: string, vehicleData: Partial<IRegisterVehicle>): Promise<boolean> => {
    setLoadingAction(true);
    setError(null);

    try {
      if (!vehicleData.id_dueno) {
        throw new Error("Falta el ID del dueño del vehículo");
      }

      await vehicleUseCases.updateVehicle(id, vehicleData);
      await fetchVehicles();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al actualizar el vehículo");
      return false;
    } finally {
      setLoadingAction(false);
    }
  };

  // Eliminar vehículo
  const deleteVehicle = async (id: string): Promise<boolean> => {
    setLoadingAction(true);
    setError(null);

    try {
      await vehicleUseCases.deleteVehicle(id);
      await fetchVehicles();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al eliminar el vehículo");
      return false;
    } finally {
      setLoadingAction(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading: loadingList || loadingAction, // loading general si quieres usarlo combinado
    loadingList,
    loadingAction,
    error,
    registerVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleDetails,
    fetchVehicles,
  };
};

export default useVehiclesData;
