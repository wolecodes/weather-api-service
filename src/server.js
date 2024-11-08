import getWeatherData from "./controller.js";
import express from "express";
import { Router } from "express";
import morgan from "morgan";

const router = Router();
const app = express();
app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/current/:location", getWeatherData);

app.use("/api/v1/weather", router);

//Listen to server.
app.listen(3000, () => {
  console.log(`Server listen at port http://localhost:3000`);
});
