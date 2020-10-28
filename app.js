require("dotenv").config();
const express = require("express");
const cors = require("cors");

const initialRouter = require("./routes/initialRouter");
const detailsRouter = require("./routes/detailsRouter");
const episodesRouter = require("./routes/episodesRouter");
const videoRouter = require("./routes/videoRouter");
const genresRouter = require("./routes/genresRouter");
const genreRouter = require("./routes/genreRouter");
const dataRouter = require("./routes/dataRouter");

const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/initial", initialRouter);
app.use("/details", detailsRouter);
app.use("/episodes", episodesRouter);
app.use("/video", videoRouter);
app.use("/genres", genresRouter);
app.use("/genre", genreRouter);
app.use("/data", dataRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
