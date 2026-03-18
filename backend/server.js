const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const errorHandler = require("./middleware/errorHandler");



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", require("./routes/movieRoutes"));

app.listen(5000, () => console.log("Server Running"));
app.use(errorHandler);