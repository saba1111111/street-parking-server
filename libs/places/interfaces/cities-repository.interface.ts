import { ICity } from "./city.interface";

export interface ICityRepository {
  findAllCitiesWithFreeLocations(): Promise<ICity[]>;
  findById(id: number): Promise<ICity | null>;
}
