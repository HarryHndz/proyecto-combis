import { LocalStoreInterface } from "@/domain/repository/localStoreInterface";

export class LocalStoreRepository<T> implements LocalStoreInterface<T>{
  save(key: string, value: T): void {
    localStorage.setItem(key.toString(),JSON.stringify(value))
  } 
  get(key: string): T | null {
    const data = localStorage.getItem(key.toString())
    return data ? JSON.parse(data):null
  }
  remove(key: string): void {
    localStorage.removeItem(key.toString())
  }
  
}