import { LocalStoreRepository } from "@/data/repository/localRepository";
import { LocalStoreInterface } from "../repository/localStoreInterface";

export class LocalStoreUseCase<T> implements LocalStoreInterface<T>{
  private localRepository:LocalStoreRepository<T>
  constructor(repository:LocalStoreRepository<T>){
    this.localRepository = repository
  } 
  save(key: string, value: T): void {
    this.localRepository.save(key,value)
  }
  get(key: string): T | null {
    const data = this.localRepository.get(key)
    return data
  }
  remove(key: string): void {
    this.localRepository.remove(key)
  }

}