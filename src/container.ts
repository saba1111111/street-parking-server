import { Container, interfaces } from "inversify";
import { IResponseHandlerService } from "../libs/common/interfaces";
import { RESPONSE_HANDLER_SERVICE_TOKEN } from "../libs/common/constants";
import { ResponseHandlerService } from "../libs/common/services";
import { IUserRepository } from "../libs/users/interfaces";
import { USERS_REPOSITORY_TOKEN } from "../libs/users/constants";
import { UsersSequelizeRepository } from "../libs/users/repositories";
import {
  ICityRepository,
  ILocationsRepository,
} from "../libs/places/interfaces";
import {
  CITIES_REPOSITORY_TOKEN,
  LOCATIONS_REPOSITORY_TOKEN,
} from "../libs/places/constants/tokens.constants";
import {
  CitiesSequelizeRepository,
  LocationsSequelizeRepository,
} from "../libs/places/repositories";
import {
  IParkingHistoryRepository,
  IParkingPriceCalculationStrategy,
} from "../libs/parkingHistory/interfaces";
import {
  CALCULATE_PARKING_PRICE_STRATEGY_TOKEN,
  PARKING_HISTORY_REPOSITORY_TOKEN,
  PRICING_STRATEGY_FACTORY_TOKEN,
} from "../libs/parkingHistory/constants";
import { ParkingHistorySequelizeRepository } from "../libs/parkingHistory/repositories";
import {
  NewYorkParkingPriceCalculationStrategy,
  WashingtonParkingPriceCalculationStrategy,
} from "../libs/parkingHistory/services/parking-price-calculation.service";
import { CITIES } from "../libs/places/constants";
import { PricingStrategyFactory } from "../libs/parkingHistory/helpers";

const container = new Container({
  defaultScope: "Singleton",
  autoBindInjectable: true,
});

container
  .bind<IResponseHandlerService>(RESPONSE_HANDLER_SERVICE_TOKEN)
  .to(ResponseHandlerService);

container
  .bind<IUserRepository>(USERS_REPOSITORY_TOKEN)
  .to(UsersSequelizeRepository);

container
  .bind<ICityRepository>(CITIES_REPOSITORY_TOKEN)
  .to(CitiesSequelizeRepository);

container
  .bind<ILocationsRepository>(LOCATIONS_REPOSITORY_TOKEN)
  .to(LocationsSequelizeRepository);

container
  .bind<IParkingHistoryRepository>(PARKING_HISTORY_REPOSITORY_TOKEN)
  .to(ParkingHistorySequelizeRepository);

container
  .bind<IParkingPriceCalculationStrategy>(
    CALCULATE_PARKING_PRICE_STRATEGY_TOKEN
  )
  .to(NewYorkParkingPriceCalculationStrategy)
  .whenTargetNamed(CITIES.NewYork);

container
  .bind<IParkingPriceCalculationStrategy>(
    CALCULATE_PARKING_PRICE_STRATEGY_TOKEN
  )
  .to(WashingtonParkingPriceCalculationStrategy)
  .whenTargetNamed(CITIES.Washington);

container
  .bind<interfaces.Factory<IParkingPriceCalculationStrategy>>(
    PRICING_STRATEGY_FACTORY_TOKEN
  )
  .toFactory<IParkingPriceCalculationStrategy, [string]>(
    PricingStrategyFactory
  );

export { container };
