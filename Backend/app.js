const express = require("express");

const userRoutes = require("./routes/userRoute");

const app = express();

app.use("api/users", userRoutes);

module.exports = app;
