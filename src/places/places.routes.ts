import express from "express";
import { container } from "../container";
import { PlacesController } from "./places.controller";

const router = express.Router();
const placesController = container.get(PlacesController);

router.get("/cities", placesController.findAll.bind(placesController));

export default router;
