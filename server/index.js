import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
