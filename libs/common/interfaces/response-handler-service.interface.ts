export interface IHandlerInput<T> {
  message: string;
  data?: T;
  status?: number;
}

export interface IHandlerResponse<T> {
  message: string;
  data: T | null;
  success: boolean;
  status: number;
}

export interface IResponseHandlerService {
  success<T>(input: IHandlerInput<T>): IHandlerResponse<T>;
  error<T>(input: IHandlerInput<T>): IHandlerResponse<T>;
}
