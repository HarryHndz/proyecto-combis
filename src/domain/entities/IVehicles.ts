export interface IRegisterVehicle {
  id?: string; // Si el ID es opcional
  activo?: any; // Hacerlo opcional para que no sea necesario al momento de registrar
  ruta_nombre?: any; // Hacerlo opcional
  id_vehiculos?: number; // Hacerlo opcional
  id_dueno?: number | string; // Permitir tanto number como string
  id_conductor?: number | string; // Permitir tanto number como string
  id_ruta?: number | string;  // Permitir tanto number como string
  numero?: string; // Hacerlo opcional
  matricula?: string; // Hacerlo opcional
  rutas?: {
    id_ruta?: number; // Hacerlo opcional
    nombre?: string; // Hacerlo opcional
    activo?: boolean | null; // Hacerlo opcional
  };
}
