import { injectable } from "inversify";
import { IParkingPriceCalculationStrategy } from "../interfaces";

@injectable()
export class NewYorkParkingPriceCalculationStrategy
  implements IParkingPriceCalculationStrategy
{
  private pricePerHour: number = 5;

  public execute(input: { startDate: Date; endDate: Date }): number {
    const { startDate, endDate } = input;

    const durationMs = endDate.getTime() - startDate.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    const totalPrice = durationHours * this.pricePerHour;
    const roundedPrice = Math.round(totalPrice * 100) / 100;

    return roundedPrice;
  }
}

@injectable()
export class WashingtonParkingPriceCalculationStrategy
  implements IParkingPriceCalculationStrategy
{
  private dayPricePerHour: number = 2;
  private nightPricePerHour: number = 5;

  public execute(input: { startDate: Date; endDate: Date }): number {
    const { startDate, endDate } = input;

    let current = new Date(startDate);
    let totalPrice = 0;

    while (current < endDate) {
      const currentHour = current.getHours();
      const pricePerHour =
        currentHour >= 8 && currentHour < 20
          ? this.dayPricePerHour
          : this.nightPricePerHour;

      let endOfHour = new Date(current);
      endOfHour.setMinutes(59, 59, 999);

      if (endOfHour > endDate) {
        endOfHour = endDate;
      }

      const durationMs = endOfHour.getTime() - current.getTime();
      const durationHours = durationMs / (1000 * 60 * 60);

      totalPrice += durationHours * pricePerHour;

      current.setHours(current.getHours() + 1, 0, 0, 0);
    }

    const roundedPrice = Math.round(totalPrice * 100) / 100;

    return roundedPrice;
  }
}
