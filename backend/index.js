import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, MONGO_URI } from "./config.js";
import  reviewRoute  from "./routes/reviewRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Connection successful");
});

app.use('/reviews', reviewRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
