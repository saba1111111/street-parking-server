import { DataTypes, Model } from "sequelize";
import sequelize from "../db-client";
import LocationsModel from "./locations.model";
import { ILocation } from "../../places/interfaces";

class CityModel extends Model {
  public id!: number;
  public name!: string;
  public country!: string;
  public readonly locations?: ILocation[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CityModel.init(
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
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CityModel",
    tableName: "cities",
  }
);

CityModel.hasMany(LocationsModel, {
  foreignKey: "cityId",
  as: "locations",
});

export default CityModel;
