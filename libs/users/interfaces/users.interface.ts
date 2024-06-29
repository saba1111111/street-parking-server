export interface IUser {
  id: number;
  email: string;
  address: string;
  full_name: string;
  car_plate_number: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserData {
  email: string;
  address: string;
  full_name: string;
  car_plate_number: string;
}

export type TFindOneUserOptions = { email: string } | { id: number };
