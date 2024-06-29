import { DataTypes, Model } from "sequelize";
import sequelize from "../db-client";

class LocationsModel extends Model {
  public id!: number;
  public name!: string;
  public cityId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LocationsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CityModel",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "LocationsModel",
    tableName: "locations",
  }
);

export default LocationsModel;
