import { ILocation } from "./location.interface";

export interface ICity {
  id: number;
  name: string;
  country: string;
  locations?: ILocation[];
  createdAt: Date;
  updatedAt: Date;
}
