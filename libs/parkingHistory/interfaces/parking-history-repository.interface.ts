import { IFindParkingItemData } from "./find-parking-history-item.interface";
import { IParkingHistory } from "./parking-history.interface";
import { IStartParkingRepositoryData } from "./start-parking-data.interface";

export interface IParkingHistoryRepository {
  create(input: IStartParkingRepositoryData): Promise<IParkingHistory>;
  findOne(input: IFindParkingItemData): Promise<IParkingHistory | null>;
  updateById(
    id: number,
    updateData: Partial<IParkingHistory>
  ): Promise<IParkingHistory | null>;
}
