const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};
// config dot env file
dotenv.config();
//databse call
connectDb();
//rest object
const app = express();
//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));

//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));
//port
const PORT = 4000 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
