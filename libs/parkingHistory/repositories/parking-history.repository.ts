import { injectable } from "inversify";
import ParkingHistoryModel from "../../database/models/parking-history.model";
import {
  IFindParkingItemData,
  IParkingHistory,
  IParkingHistoryRepository,
  IStartParkingRepositoryData,
} from "../interfaces";
import LocationsModel from "../../../libs/database/models/locations.model";

@injectable()
export class ParkingHistorySequelizeRepository
  implements IParkingHistoryRepository
{
  public findAll(userId: number) {
    return ParkingHistoryModel.findAll({
      where: { userId },
      include: [
        {
          model: LocationsModel,
          as: "location",
          required: true,
        },
      ],
    });
  }

  public create(input: IStartParkingRepositoryData): Promise<IParkingHistory> {
    return ParkingHistoryModel.create(input as IParkingHistory);
  }

  public findOne(input: IFindParkingItemData): Promise<IParkingHistory | null> {
    return ParkingHistoryModel.findOne({
      where: input as Partial<IParkingHistory>,
    });
  }

  public async updateById(
    id: number,
    updateData: Partial<IParkingHistory>
  ): Promise<IParkingHistory | null> {
    const [affectedRows] = await ParkingHistoryModel.update(updateData, {
      where: { id },
    });

    if (affectedRows === 0) {
      return null;
    }

    const updatedItem = await ParkingHistoryModel.findByPk(id);

    return updatedItem;
  }
}
