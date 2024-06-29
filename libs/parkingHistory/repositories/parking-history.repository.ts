import { injectable } from "inversify";
import ParkingHistoryModel from "../../database/models/parking-history.model";
import {
  IFindParkingItemData,
  IParkingHistory,
  IParkingHistoryRepository,
  IStartParkingRepositoryData,
} from "../interfaces";

@injectable()
export class ParkingHistorySequelizeRepository
  implements IParkingHistoryRepository
{
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
