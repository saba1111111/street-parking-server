import { ParkingHistoryStatuses } from "../constants";

export interface IParkingHistory {
  id: number;
  userId: number;
  locationId: number;
  startAt: Date;
  finishAt: Date | null;
  status: ParkingHistoryStatuses;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
