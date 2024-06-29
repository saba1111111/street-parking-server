import express from "express";
import { container } from "../container";
import { ParkingsController } from "./parkings.controller";
import { validateParking } from "../../libs/parkingHistory/validations";

const router = express.Router();
const parkingsController = container.get(ParkingsController);

router.post(
  "/start",
  validateParking,
  parkingsController.startParking.bind(parkingsController)
);

router.post(
  "/finish",
  validateParking,
  parkingsController.finishParking.bind(parkingsController)
);

export default router;
