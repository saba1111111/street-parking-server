import { ILocation, ILocationsRepository } from "../interfaces";
import LocationsModel from "../../database/models/locations.model";
import { injectable } from "inversify";

@injectable()
export class LocationsSequelizeRepository implements ILocationsRepository {
  public findAll(): Promise<ILocation[]> {
    return LocationsModel.findAll();
  }

  public findById(id: number): Promise<ILocation | null> {
    return LocationsModel.findByPk(id);
  }
}
