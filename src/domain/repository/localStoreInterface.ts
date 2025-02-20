export interface LocalStoreInterface<T>{
  save(key:number, value:T):void
  get(key:number):T | null
  remove(key:number):void
}