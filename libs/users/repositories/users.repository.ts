import {
  ICreateUserData,
  IUser,
  IUserRepository,
  TFindOneUserOptions,
} from "../interfaces";
import UsersModel from "../../database/models/users.model";
import { injectable } from "inversify";

@injectable()
export class UsersSequelizeRepository implements IUserRepository {
  public async create(input: ICreateUserData): Promise<IUser> {
    const newUser = await UsersModel.create(input as IUser);
    return newUser.toJSON() as IUser;
  }

  public async findOne(input: TFindOneUserOptions): Promise<IUser | null> {
    const user = await UsersModel.findOne({ where: input });
    return user ? (user.toJSON() as IUser) : null;
  }
}
