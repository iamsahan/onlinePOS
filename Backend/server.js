const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const itemRoute = require("./routes/itemRoute");

const errorHandler = require("./middleware/errorMiddleware");
const posRoute = require("./routes/posRoute");

const app = express();

const PORT = process.env.PORT || 8070;

dotenv.config({ path: "./config.env" });


app.use(cors()) // Use this after the variable declaration

// Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes middlewares
// app.use("/", userRoute);
app.use("/api/pos", posRoute);

// app.use("/api/users", userRoute);
// app.use("/api/category", categoryRoute);
// app.use("/api/items", itemRoute);


// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
// error middleware

app.use(errorHandler);

// connect to DB and start server
mongoose
  .connect("mongodb+srv://iamsahan:sew123@inventory.axqereu.mongodb.net/?retryWrites=true&w=majority&appName=inventory")
  .then(() => {
    console.log("DB Connection Successful!");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })

  .catch((err) => console.log(err));
