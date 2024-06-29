import { inject, injectable } from "inversify";
import { RESPONSE_HANDLER_SERVICE_TOKEN } from "../../common/constants";
import {
  IHandlerResponse,
  IResponseHandlerService,
} from "../../common/interfaces";

import { ICreateUserData, IUser } from "libs/users/interfaces";
import { UsersService } from "../../users/services";
import {
  EmailAlreadyExistsException,
  UserCreationFailedException,
  UserWithThisEmailNotExistException,
} from "../exceptions/user-register.exceptions";

@injectable()
export class AuthService {
  constructor(
    @inject(RESPONSE_HANDLER_SERVICE_TOKEN)
    private readonly responseHandler: IResponseHandlerService,
    private readonly usersService: UsersService
  ) {}

  public async register(
    input: ICreateUserData
  ): Promise<IHandlerResponse<IUser>> {
    try {
      const existingUser = await this.usersService.findOne({
        email: input.email,
      });
      if (existingUser) {
        throw new EmailAlreadyExistsException(input.email);
      }

      const newUser = await this.usersService.create(input);
      if (!newUser) {
        throw new UserCreationFailedException();
      }

      return this.responseHandler.success<IUser>({
        message: "User created successfully.",
        data: newUser,
      });
    } catch (error) {
      let message = "An error occurred while creating user.";
      if (error instanceof Error) {
        message = error.message;
      }

      return this.responseHandler.error<IUser>({
        message,
      });
    }
  }

  public async login(email: string): Promise<IHandlerResponse<IUser>> {
    try {
      const existingUser = await this.usersService.findOne({ email });
      if (!existingUser) {
        throw new UserWithThisEmailNotExistException(email);
      }

      return this.responseHandler.success<IUser>({
        message: "User logged in successfully.",
        data: existingUser,
      });
    } catch (error) {
      let message = "An error occurred while logging in.";
      if (error instanceof Error) {
        message = error.message;
      }

      return this.responseHandler.error<IUser>({
        message,
      });
    }
  }
}
