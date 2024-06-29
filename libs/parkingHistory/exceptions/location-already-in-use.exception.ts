export class LocationAlreadyInUseException extends Error {
  constructor(locationId: number) {
    super(`Location with ID ${locationId} is already in use by another car`);
  }
}
