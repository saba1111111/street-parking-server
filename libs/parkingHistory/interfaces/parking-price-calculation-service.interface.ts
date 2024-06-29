export interface IParkingPriceCalculationStrategy {
  execute(input: { startDate: Date; endDate: Date }): number;
}
