import { ICity } from "./city.interface";

export interface ILocation {
  id: number;
  name: string;
  cityId: number;
  city?: ICity;
  createdAt: Date;
  updatedAt: Date;
}
