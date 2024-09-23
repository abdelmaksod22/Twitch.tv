import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./src/routes/authRoutes.js";
import channelsRoutes from "./src/routes/channelsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelsRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/twitch")
  .then(() => {
    console.log("Connection Is Open!!!");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
