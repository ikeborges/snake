import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();

app.use(cors());

const dbClient = new MongoClient(process.env.MONGO_URI);

app.get("/ranking", async (req, res) => {
  const { playerName, score, elapsedTime } = req.query;

  console.log(req.query);

  if (!playerName || !score || !elapsedTime) {
    throw new Error("Missing parameter");
  }

  let result;

  try {
    const connection = await dbClient.connect();
    result = await connection
      .db("ranking")
      .collection("ranking")
      .insertOne({
        playerName,
        score: parseInt(score),
        elapsedTime: parseInt(elapsedTime),
      });
  } catch (error) {
    console.log(error);
  }

  res.send(result);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});
