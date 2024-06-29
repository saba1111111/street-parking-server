import { ParkingHistoryStatuses } from "../constants";

export interface IFindParkingItemData {
  locationId?: number;
  status?: ParkingHistoryStatuses;
  userId?: number;
}
