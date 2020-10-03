require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const initialRouter = require("./routes/initialRouter");
const detailsRouter = require("./routes/detailsRouter");

app.use(cors());

app.use(express.json());

app.use("/initial", initialRouter);
app.use("/details", detailsRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));