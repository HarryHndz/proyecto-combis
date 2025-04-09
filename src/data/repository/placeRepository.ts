import { IPlaceUpdate, IRoute, IRoutePlaceAdd, IRoutePlaceID } from "@/domain/entities/IPlaces";
import PlaceInterface from "@/domain/repository/placeInterface";
import { ApiClient } from "../apiClient";
export class PlaceRepository implements PlaceInterface{
  private httpClient
  constructor(){
    this.httpClient = new ApiClient().getInstance()
  }
  async getPlaceByRoute(id:number): Promise<IPlaceUpdate[]> {
    try {
      const {data} =await this.httpClient.get(`rutas-paradas-orden/${id}/paradas`)
      const info:any[] = data.data.paradas
      const response:IPlaceUpdate[] =  info.map((item)=>({
        id_place:item.id_parada,
        latitude:item.latitud,
        longitude:item.longitud,
        name:item.nombre,
        order:item.orden
      }))
      return response
    } catch (error) {
      console.log("error",error);
      throw error      
    }
  }
  async getRoutes(): Promise<IRoute[]> {
    try {
      const {data} = await this.httpClient.get('rutas')
      const info:any[] = data.data
      const response:IRoute[] = info.map((i)=>({
        id:i.id_ruta,
        name:i.nombre,
        activate:i.activo
      }))
      return response
    } catch (error) {
      console.log("error",error);
      
      throw error
    }
  }
  async createPlace(dataPlace: IRoutePlaceAdd): Promise<IRoutePlaceAdd> {
    try {
      const dataObject = {
        nombreRuta:dataPlace.name,
        paradas:dataPlace.places.map(place=>({
          nombre: place.name,
          latitud: place.latitude,
          longitud: place.longitude,
          orden: place.order
        }
      ))
      }
      const {data} =await this.httpClient.post('rutas-paradas-orden',dataObject)
      const info = data.data
      const response:IRoutePlaceAdd ={
        name:info.nombreRuta,
        places:info.paradas.map((item:any)=>({
          name:item.nombre,
          latitude:item.latitud,
          longitude:item.longitud,
          order:item.order
        }))
      }
      return response 
    } catch (error) {
      throw error
    }
  }
  async getPlace(): Promise<IRoutePlaceID[]> {
    try {
      const {data} =await this.httpClient.get('rutas-paradas-orden')
      const info:any[] = data.data
      console.log("data",info);
      const response:IRoutePlaceID[] = info.map((i)=>({
        id:i.id_ruta,
        id_order:i.id_orden,
        order:i.orden,
        places:{
          id_place:i.paradas.id_parada,
          name:i.paradas.nombre,
          latitude:i.paradas.latitud,
          longitude:i.paradas.longitud,
          order:i.paradas.orden
        }
      }))
      
      return response
    } catch (error) {
      console.log(error);
      throw error
    }
  }
  async deletePlace(id: number): Promise<void> {
    try {
      await this.httpClient.delete(`rutas-paradas-orden/${id}`)
    } catch (error) {
      console.log("error",error);
      throw error
    }

  }
  async updatePlace(dataPlace: IRoutePlaceAdd): Promise<IRoutePlaceAdd> {

    throw new Error("Method not implemented.");
  }
}