require("dotenv").config();
const express = require("express");
const dbClient = require("./dbClient.js");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
  })
);

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.post("/ranking", async (req, res) => {
  const { playerName, score, elapsedTime } = req.query;

  if (!playerName || !score || !elapsedTime) {
    throw new Error("Missing parameter");
  }

  await dbClient.addToRanking(playerName, score, elapsedTime);

  res.sendStatus(201);
});

app.get("/ranking", async (req, res) => {
  const result = await dbClient.getRanking();

  res.send(
    result.map((x, index) => {
      return { ...x, position: index + 1 };
    })
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});

module.exports = app;
