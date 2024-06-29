import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import AuthRoutes from "./auth/auth.routes";
import PlacesRoutes from "./places/places.routes";
import ParkingsRoutes from "./parkings/parkings.routes";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/ping", (req, res) => res.json("pong"));
app.use("/auth", AuthRoutes);
app.use("/places", PlacesRoutes);
app.use("/parkings", ParkingsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
