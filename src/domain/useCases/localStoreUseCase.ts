import { LocalStoreRepository } from "@/data/repository/localRepository";
import { LocalStoreInterface } from "../repository/localStoreInterface";

export class LocalStoreUseCase<T> implements LocalStoreInterface<T>{
  private localRepository:LocalStoreRepository<T>
  constructor(repository:LocalStoreRepository<T>){
    this.localRepository = repository
  }
  save(key: number, value: T): void {
    this.localRepository.save(key,value)
  }
  get(key: number): T | null {
    const data = this.localRepository.get(key)
    return data
  }
  remove(key: number): void {
    this.localRepository.remove(key)
  }

}