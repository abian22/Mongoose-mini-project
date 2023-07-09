const dotenv = require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const morgan = require("morgan")

function startExpress() {
  const app = express()
  .use(express.json())
  .use("/api", require("./src/routes/index"))
  .use(cors())
  .use(morgan('dev'))

  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log("MongoDB connected....")
    })
    .catch((err) => console.log(err.message))

  app.listen(process.env.PORT, () => {
    console.log(`On port ${process.env.PORT} !!!`)
  });

  app.get("/", (req, res) => {
    res.send("Welcome to my API")
  });
}

async function start() {
  await startExpress()
}

start()
