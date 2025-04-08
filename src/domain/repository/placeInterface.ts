import { IPlaceUpdate, IRoute, IRoutePlaceAdd, IRoutePlaceID } from "../entities/IPlaces"

export default interface PlaceInterface{
  createPlace(dataPlace:IRoutePlaceAdd):Promise<IRoutePlaceAdd>
  getPlace():Promise<IRoutePlaceID[]>
  getPlaceByRoute(id:number):Promise<IPlaceUpdate[]>
  getRoutes():Promise<IRoute[]>
  deletePlace(id:number):Promise<void>
  updatePlace(dataPlace:IRoutePlaceAdd):Promise<IRoutePlaceAdd>
}