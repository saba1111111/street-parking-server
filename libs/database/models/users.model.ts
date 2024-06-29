// users.model.ts

import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../db-client"; // Adjust the path as per your project structure
import { IUser } from "libs/users/interfaces"; // Adjust the path as per your project structure

class UsersModel extends Model<IUser> implements IUser {
  public id!: number;
  public email!: string;
  public address!: string;
  public full_name!: string;
  public car_plate_number!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    car_plate_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "UsersModel",
    tableName: "users",
  }
);

export default UsersModel;
