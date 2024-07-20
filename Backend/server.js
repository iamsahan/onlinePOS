import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import itemRoute from "./routes/itemRoute.js";
import supplierRoutes from "./routes/supplierRoute.js";

import authRoutes from './routes/auth.js';

import EmployeeRoute from './routes/EmployeeRoute.js';
// import employeeAttendanceRoute from './routes/employeeAttendanceRoute.js';
// import Return_Route from './routes/Return_Route.js';
// import Customer_Route from './routes/Customer_Route.js';

import errorHandler from "./middleware/errorMiddleware.js";
import posRoute from "./routes/posRoute.js";

const app = express();
const PORT = process.env.PORT || 8070;

dotenv.config({ path: "./config.env" });

app.use(cors()); // Use this after the variable declaration

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes middlewares
app.use("/api/pos", posRoute);
app.use('/api/sup', supplierRoutes);
app.use('/employees', EmployeeRoute); // Mount employee-related routes
app.use('/api/itm', itemRoute);
app.use('/api/auth', authRoutes);
//app.use('/EmployeeAttendence', employeeAttendanceRoute); // Mount employee attendance-related routes
//app.use('/returns', Return_Route); // Mount return-related routes
//app.use('/customers', Customer_Route);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error middleware
app.use(errorHandler);

const mongoUri = 'mongodb+srv://iamsahan:sew123@inventory.axqereu.mongodb.net';

const mainDbUri = `${mongoUri}/main_db?retryWrites=true&w=majority`;

// Connect to DB and start server
mongoose.connect(mainDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("DB Connection Successful!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
