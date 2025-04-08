import { IPlaceUpdate } from "./IPlaces"

export interface IPlaceRoute{
  id:number
  name:string,
  places:IPlaceUpdate[]
}