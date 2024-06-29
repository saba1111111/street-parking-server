import { inject, injectable } from "inversify";
import { LOCATIONS_REPOSITORY_TOKEN } from "../constants";
import { ILocation, ILocationsRepository } from "../interfaces";
import { locationNotFoundException } from "../exceptions";

@injectable()
export class LocationsService {
  constructor(
    @inject(LOCATIONS_REPOSITORY_TOKEN)
    private readonly locationsRepository: ILocationsRepository
  ) {}

  async findByIdOrThrow(id: number): Promise<ILocation> {
    const location = await this.locationsRepository.findById(id);
    if (!location) {
      throw new locationNotFoundException(id);
    }
    return location;
  }
}
