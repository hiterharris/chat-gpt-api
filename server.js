const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();

const BedtimeRouter = require("./routes/bedtime-story.js");
const EnglishDariRouter = require("./routes/english-dari.js");
const TranslateRouter = require("./routes/translate.js");
const RecipesRouter = require("./routes/recipes.js");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Chat GPT API");
});

server.use("/api/bedtime-story", BedtimeRouter);
server.use("/api/english-dari", EnglishDariRouter);
server.use("/api/translate", TranslateRouter);
server.use("/api/recipes", RecipesRouter);

module.exports = server;
