require("dotenv").config({ path: "./backend/.env"});
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 5000;


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", require("./routes/movieRoutes"));

app.listen(5000, () => console.log("Server Running"));
app.use(errorHandler);
console.log("ENV VALUE:", process.env.MONGO_URI);