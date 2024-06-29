import { ParkingHistoryStatuses } from "../constants";

export interface IStartParkingData {
  userId: number;
  locationId: number;
}

export interface IFinishParkingData {
  userId: number;
  locationId: number;
}

export interface IStartParkingRepositoryData {
  userId: number;
  locationId: number;
  status: ParkingHistoryStatuses;
}
