import { injectable } from "inversify";
import {
  IHandlerInput,
  IHandlerResponse,
  IResponseHandlerService,
} from "../interfaces";

@injectable()
export class ResponseHandlerService implements IResponseHandlerService {
  public success<T>(input: IHandlerInput<T>): IHandlerResponse<T> {
    const { message, data = null, status = 200 } = input;

    return {
      message,
      data,
      success: true,
      status,
    };
  }

  public error<T>(input: IHandlerInput<T>): IHandlerResponse<T> {
    const { message, data = null, status = 400 } = input;

    return {
      message,
      data,
      success: false,
      status,
    };
  }
}
