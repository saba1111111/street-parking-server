export class locationNotFoundException extends Error {
  constructor(id: number) {
    super(`location with id: ${id} not found.`);
    this.name = "CitiesNotFoundException";
  }
}
