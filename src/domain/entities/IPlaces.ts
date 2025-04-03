export interface IPlace{
  name:string,
  latitude:string,
  longitude:string
  order:string
}


export interface IPlaceUpdate extends IPlace{
  id_place:number
}

export interface IRoute{
  name:string,
  places:IPlace[]
}


