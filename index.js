const dotenv = require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const app = express();


app.use(express.json());
app.use('/api', require('./src/routes/index'))

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
})
  .then(() => {
    console.log("MongoDB connected....");
  })
  .catch(err => console.log(err.message));

app.listen(process.env.PORT, () => {
  console.log(`On port ${process.env.PORT} !!!`);
});

app.get("/", (req,res) => {
    res.send("Welcome to my API")
})
