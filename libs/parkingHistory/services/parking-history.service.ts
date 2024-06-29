import { inject, injectable } from "inversify";
import {
  PARKING_HISTORY_REPOSITORY_TOKEN,
  PRICING_STRATEGY_FACTORY_TOKEN,
  ParkingHistoryStatuses,
} from "../constants";
import {
  IFindParkingItemData,
  IFinishParkingData,
  IParkingHistory,
  IParkingHistoryRepository,
  IStartParkingData,
} from "../interfaces";
import { UsersService } from "../../users/services";
import { CitiesService, LocationsService } from "../../places/services";
import { RESPONSE_HANDLER_SERVICE_TOKEN } from "../../common/constants";
import { IResponseHandlerService } from "../../common/interfaces";
import {
  LocationAlreadyInUseException,
  ParkingNotStartedException,
} from "../exceptions";
import { IPricingStrategyFactory } from "../helpers";

@injectable()
export class ParkingHistoryService {
  constructor(
    @inject(PARKING_HISTORY_REPOSITORY_TOKEN)
    private readonly parkingHistoryRepository: IParkingHistoryRepository,
    private readonly usersService: UsersService,
    private readonly locationsService: LocationsService,
    @inject(RESPONSE_HANDLER_SERVICE_TOKEN)
    private readonly responseHandler: IResponseHandlerService,
    @inject(PRICING_STRATEGY_FACTORY_TOKEN)
    private readonly pricingStrategyFactory: IPricingStrategyFactory,
    private readonly citiesService: CitiesService
  ) {}

  public findOne(input: IFindParkingItemData) {
    return this.parkingHistoryRepository.findOne(input);
  }

  public async startNewParking(input: IStartParkingData) {
    try {
      await this.usersService.findByIdOrThrow(input.userId);
      await this.locationsService.findByIdOrThrow(input.locationId);

      const checkLocationAvailability = await this.findOne({
        locationId: input.locationId,
        status: ParkingHistoryStatuses.ACTIVE,
      });
      if (checkLocationAvailability) {
        throw new LocationAlreadyInUseException(input.locationId);
      }

      const newParking = await this.parkingHistoryRepository.create({
        locationId: input.locationId,
        status: ParkingHistoryStatuses.ACTIVE,
        userId: input.userId,
      });

      return this.responseHandler.success({
        message: "Successfully start new parking.",
        data: newParking,
      });
    } catch (error) {
      let message = "An error occurred while starting parking.";
      if (error instanceof Error) {
        message = error.message;
      }

      return this.responseHandler.error({
        message,
      });
    }
  }

  public async finishParking(input: IFinishParkingData) {
    try {
      await this.usersService.findByIdOrThrow(input.userId);
      const location = await this.locationsService.findByIdOrThrow(
        input.locationId
      );

      const checkParking = await this.findOne({
        locationId: input.locationId,
        status: ParkingHistoryStatuses.ACTIVE,
        userId: input.userId,
      });
      if (!checkParking) {
        throw new ParkingNotStartedException(input.locationId);
      }

      const city = await this.citiesService.findById(location.cityId);

      const calculateParkingPriceStrategy = this.pricingStrategyFactory(
        city.name
      );
      const totalPrice = calculateParkingPriceStrategy.execute({
        startDate: checkParking.startAt,
        endDate: new Date(),
      });

      const result = await this.parkingHistoryRepository.updateById(
        checkParking.id,
        {
          status: ParkingHistoryStatuses.FINISHED,
          finishAt: new Date(),
          amount: totalPrice,
        }
      );

      return this.responseHandler.success({
        message: "Successfully finish parking.",
        data: result,
      });
    } catch (error) {
      let message = "An error occurred while finishing parking.";
      if (error instanceof Error) {
        message = error.message;
      }

      return this.responseHandler.error({
        message,
      });
    }
  }

  public async findAll(userId: number) {
    try {
      const parkings = await this.parkingHistoryRepository.findAll(userId);

      if (!parkings) {
        return this.responseHandler.error({
          message: "parkings not found.",
        });
      }

      return this.responseHandler.success({
        message: "Successfully fetched parkings.",
        data: parkings,
      });
    } catch (error) {
      let message = "An error occurred while fetching parkings.";
      if (error instanceof Error) {
        message = error.message;
      }

      return this.responseHandler.error<IParkingHistory>({
        message,
      });
    }
  }
}
