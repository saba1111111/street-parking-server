import express from "express";
import { z } from "zod";
import { handleValidationFail } from "../../../libs/common/helpers";

export const RegisterSchema = z.object({
  email: z.string().email(),
  address: z.string(),
  full_name: z.string(),
  car_plate_number: z.string(),
});

export function validateRegister(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    RegisterSchema.parse(req.body);

    next();
  } catch (error) {
    handleValidationFail(error, res);
  }
}
