const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const posRoute = require("./routes/posRoute");

const app = express();

const PORT = process.env.PORT || 8090;

// Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes middlewares
app.use("/", userRoute);
app.use("/", posRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
// error middleware

app.use(errorHandler);

// connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connection Successful!");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })

  .catch((err) => console.log(err));
