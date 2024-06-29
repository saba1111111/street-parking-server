import { ICreateUserData, IUser, TFindOneUserOptions } from "./users.interface";

export interface IUserRepository {
  create(input: ICreateUserData): Promise<IUser>;
  findOne(input: TFindOneUserOptions): Promise<IUser | null>;
}
