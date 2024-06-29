import { ILocation } from "./location.interface";

export interface ILocationsRepository {
  findAll(): Promise<ILocation[]>;
  findById(id: number): Promise<ILocation | null>;
}
