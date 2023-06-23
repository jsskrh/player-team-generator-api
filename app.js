const express = require("express");
const mongoose = require("mongoose");
const playerRoutes = require("./routes/players");
const teamRoutes = require("./routes/team");

const app = express();

app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/backend_test";

mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to Database.");
  })
  .catch((err) => {
    console.log("Unable to connect to Database.", err);
  });

app.use("/api/player", playerRoutes);
app.use("/api/team", teamRoutes);

module.exports = app;
