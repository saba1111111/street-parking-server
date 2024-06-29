import { injectable } from "inversify";
import { Request, Response } from "express";
import { AuthService } from "../../libs/auth/services";

@injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public async register(req: Request, res: Response) {
    const response = await this.authService.register(req.body);
    return res.status(response.status).json(response);
  }

  public async login(req: Request, res: Response) {
    const response = await this.authService.login(req.body.email);
    return res.status(response.status).json(response);
  }
}
