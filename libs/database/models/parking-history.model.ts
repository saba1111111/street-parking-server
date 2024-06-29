import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../db-client";
import { ParkingHistoryStatuses } from "../../parkingHistory/constants";
import { IParkingHistory } from "../../parkingHistory/interfaces";

class ParkingHistoryModel
  extends Model<IParkingHistory>
  implements IParkingHistory
{
  public id!: number;
  public userId!: number;
  public locationId!: number;
  public startAt!: Date;
  public finishAt!: Date | null;
  public status!: ParkingHistoryStatuses;
  public amount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ParkingHistoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UsersModel",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LocationsModel",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    finishAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ParkingHistoryStatuses)),
      allowNull: false,
      defaultValue: "Active",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
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
    modelName: "ParkingHistoryModel",
    tableName: "parking_history",
  }
);

export default ParkingHistoryModel;
