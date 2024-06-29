import { injectable } from "inversify";
import CityModel from "../../database/models/cities.model";
import { ICity, ICityRepository } from "../interfaces";
import LocationsModel from "../../database/models/locations.model";
import { Op } from "sequelize";
import sequelize from "../../../libs/database/db-client";

@injectable()
export class CitiesSequelizeRepository implements ICityRepository {
  public findAllCitiesWithFreeLocations(): Promise<ICity[]> {
    return CityModel.findAll({
      include: [
        {
          model: LocationsModel,
          as: "locations",
          where: {
            id: {
              [Op.notIn]: sequelize.literal(`(
                SELECT "locationId" FROM "parking_history" WHERE "status" = 'Active'
              )`),
            },
          },
        },
      ],
    });
  }

  public findById(id: number): Promise<ICity | null> {
    return CityModel.findByPk(id);
  }
}
