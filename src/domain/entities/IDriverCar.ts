
export interface IDriverCar {
  id_conductor: number,
  id_vehiculos: number,
  id_usuario: number,
  vehiculos: {
    id_vehiculos: number,
    id_dueno: number,
    id_ruta: number,
    numero: string,
    matricula: string
  }
}