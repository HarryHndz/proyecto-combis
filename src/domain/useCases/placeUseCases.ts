import { PlaceRepository } from "@/data/repository/placeRepository";
import { IPlaceUpdate, IRoute, IRoutePlaceAdd, IRoutePlaceID } from "../entities/IPlaces";
import PlaceInterface from "../repository/placeInterface";

export class PlaceUseCases implements PlaceInterface{
  private placeRepository
  constructor(){
    this.placeRepository = new PlaceRepository()
  }
  async getPlaceByRoute(id: number): Promise<IPlaceUpdate[]> {
    try {
      return await this.placeRepository.getPlaceByRoute(id)
    } catch (error) {
      console.log("erro",error);
      throw error
    }
  }
  async getRoutes(): Promise<IRoute[]> {
    try {
      return await this.placeRepository.getRoutes()
    } catch (error) {
      console.log("erro",error);
      throw error
    }
  }

  async createPlace(dataPlace: IRoutePlaceAdd): Promise<IRoutePlaceAdd> {
    try {
      return await this.placeRepository.createPlace(dataPlace)
    } catch (error) {
      console.log("erro",error);
      throw error
    }
  }
  async getPlace(): Promise<IRoutePlaceID[]> {
    try {
      return await this.placeRepository.getPlace()
    } catch (error) {
      console.log("erro",error);
      throw error
    }
  }

  async deletePlace(id: number): Promise<void> {
    try {
      await this.placeRepository.deletePlace(id)
    } catch (error) {
      console.log("error",error);
      throw error
    }
  }
  async updatePlace(dataPlace: IRoutePlaceAdd): Promise<IRoutePlaceAdd> {
    try {
      return await this.placeRepository.updatePlace(dataPlace)
    } catch (error) {
      console.log("error",error);
      throw error
    }
  }
  
}