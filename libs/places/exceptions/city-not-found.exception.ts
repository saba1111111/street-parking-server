export class CitiesNotFoundException extends Error {
  constructor() {
    super("Cities not found.");
    this.name = "CitiesNotFoundException";
  }
}
