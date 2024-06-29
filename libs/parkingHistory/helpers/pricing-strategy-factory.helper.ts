import { Container, interfaces } from "inversify";
import { IParkingPriceCalculationStrategy } from "../interfaces";
import { CALCULATE_PARKING_PRICE_STRATEGY_TOKEN } from "../constants";
import { CITIES } from "../../../libs/places/constants";

export type IPricingStrategyFactory = (
  city: string
) => IParkingPriceCalculationStrategy;

export const PricingStrategyFactory = (context: interfaces.Context) => {
  return (city: string) => {
    switch (city) {
      case "New York City":
        return context.container.getNamed<IParkingPriceCalculationStrategy>(
          CALCULATE_PARKING_PRICE_STRATEGY_TOKEN,
          CITIES.NewYork
        );
      case "Washington":
        return context.container.getNamed<IParkingPriceCalculationStrategy>(
          CALCULATE_PARKING_PRICE_STRATEGY_TOKEN,
          CITIES.Washington
        );
      default:
        throw new Error("Unsupported city");
    }
  };
};
