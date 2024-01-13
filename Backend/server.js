const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.MONGO_URI.replace(
  "<PASSWORD>",
  encodeURIComponent(process.env.DATABASE_PASSWORD)
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ DB Connected Successfully");
  })
  .catch((err) => {
    console.log("Error Connecting to MongoDB ❌", err);
  });

const port = 1000;

app.listen(port, () => {
  console.log(`✅ App is running on port ${port}`);
});
