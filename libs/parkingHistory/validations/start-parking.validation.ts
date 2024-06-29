import express from "express";
import { z } from "zod";
import { handleValidationFail } from "../../../libs/common/helpers";

export const parkingSchema = z.object({
  userId: z.number(),
  locationId: z.number(),
});

export function validateParking(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    parkingSchema.parse(req.body);

    next();
  } catch (error) {
    handleValidationFail(error, res);
  }
}
