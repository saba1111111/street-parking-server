import { Request, Response } from "express";
import { injectable } from "inversify";
import { CitiesService } from "../../libs/places/services";

@injectable()
export class PlacesController {
  constructor(private readonly citiesService: CitiesService) {}

  public async findAll(req: Request, res: Response) {
    const response = await this.citiesService.findAll();
    return res.status(response.status).json(response);
  }
}
