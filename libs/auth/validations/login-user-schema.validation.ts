import express from "express";
import { z } from "zod";
import { handleValidationFail } from "../../../libs/common/helpers";

export const LoginSchema = z.object({
  email: z.string().email(),
});

export function validateLogin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    LoginSchema.parse(req.body);

    next();
  } catch (error) {
    handleValidationFail(error, res);
  }
}
