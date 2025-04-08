export interface IPlace{
  name:string,
  latitude:number,
  longitude:number
  order:number
}


export interface IPlaceUpdate extends IPlace{
  id_place:number
}

export interface IRoutePlaceAdd{
  name:string,
  places:IPlace[]
}

export interface IRoutePlaceID{
  id:number,
  id_order:number,
  order:number,
  places:IPlaceUpdate
}


export interface IRoute{
  id:number
  name:string,
  activate:boolean
}


