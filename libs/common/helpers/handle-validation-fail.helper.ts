import { container } from "../../../src/container";
import { IResponseHandlerService } from "../interfaces";
import { RESPONSE_HANDLER_SERVICE_TOKEN } from "../constants";
import express from "express";

export function handleValidationFail(error: unknown, res: express.Response) {
  const responseHandler = container.get<IResponseHandlerService>(
    RESPONSE_HANDLER_SERVICE_TOKEN
  );

  if (error instanceof Error) {
    return res.status(400).json(
      responseHandler.error({
        message: "Validation failed",
        data: "errors" in error ? error.errors : error.message,
      })
    );
  } else {
    return res.status(400).json(
      responseHandler.error({
        message: "Unexpected error occurred",
      })
    );
  }
}
