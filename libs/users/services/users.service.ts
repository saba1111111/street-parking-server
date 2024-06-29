import { inject, injectable } from "inversify";
import { USERS_REPOSITORY_TOKEN } from "../constants";
import {
  ICreateUserData,
  IUser,
  IUserRepository,
  TFindOneUserOptions,
} from "../interfaces";
import { RESPONSE_HANDLER_SERVICE_TOKEN } from "../../common/constants";
import { IResponseHandlerService } from "../../common/interfaces";
import { UserNotFoundException } from "../exceptions";

@injectable()
export class UsersService {
  constructor(
    @inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUserRepository,
    @inject(RESPONSE_HANDLER_SERVICE_TOKEN)
    private readonly responseHandler: IResponseHandlerService
  ) {}

  create(input: ICreateUserData): Promise<IUser> {
    return this.usersRepository.create(input);
  }

  findOne(input: TFindOneUserOptions) {
    return this.usersRepository.findOne(input);
  }

  async findByIdOrThrow(id: number): Promise<IUser> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }
}
