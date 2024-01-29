const dotenv = require("dotenv");
const express = require("express");

const app = express("");
const port = process.env.NODEJS_PORT || 8080;

const movieRoutes = require("./server/api/movie");

app.use("/movie", movieRoutes);

app.listen(port, () => {
  console.log(`Successfully connected to port ${port}!`);
});
