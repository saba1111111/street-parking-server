export class ParkingNotStartedException extends Error {
  constructor(locationId: number) {
    super(
      `Parking in location ${locationId} has not been started by you, so it cannot be finished.`
    );
    this.name = "ParkingNotStartedException";
  }
}
