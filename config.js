require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);
const config = { configuration, openai };

module.exports = config;
