export interface LocalStoreInterface<T>{
  save(key:string, value:T):void
  get(key:string):T | null
  remove(key:string):void
}