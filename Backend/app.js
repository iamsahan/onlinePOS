const express = require("express");

const userRoutes = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");

const app = express();

app.use("api/users", userRoutes);
app.use("/api/categories", categoryRoute);

module.exports = app;
