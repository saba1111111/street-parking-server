import { inject, injectable } from "inversify";
import { CITIES_REPOSITORY_TOKEN } from "../constants";
import { ICity, ICityRepository } from "../interfaces";
import { RESPONSE_HANDLER_SERVICE_TOKEN } from "../../common/constants";
import { IResponseHandlerService } from "../../common/interfaces";

@injectable()
export class CitiesService {
  constructor(
    @inject(CITIES_REPOSITORY_TOKEN)
    private readonly citiesRepository: ICityRepository,
    @inject(RESPONSE_HANDLER_SERVICE_TOKEN)
    private readonly responseHandler: IResponseHandlerService
  ) {}

  public async findAll() {
    try {
      const cities =
        await this.citiesRepository.findAllCitiesWithFreeLocations();

      if (!cities) {
        return this.responseHandler.error({
          message: "Cities not found.",
        });
      }

      return this.responseHandler.success({
        message: "Successfully fetched cities.",
        data: cities,
      });
    } catch (error) {
      let message = "An error occurred while fetching cities.";
      if (error instanceof Error) {
        message = error.message;
      }

      return this.responseHandler.error<ICity>({
        message,
      });
    }
  }

  public findById(id: number) {
    return this.citiesRepository.findById(id) as Promise<ICity>;
  }
}
