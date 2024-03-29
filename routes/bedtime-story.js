const router = require("express").Router();
const config = require("../config");
const { configuration, openai } = config;
const https = require('https');

router.post('/', async (req, res) => {
    if (!configuration.apiKey) {
        res.status(500).json({
        error: { message: "OpenAI API key not configured, please follow instructions in README.md" }
        });
        return;
    }

    const text = req.body.text || '';

    if (text.length === 0) {
        res.status(400).json({
        error: {
            message: "Please enter a valid prompt",
        }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 1000,
            prompt: `Tell me a story about ${text}`,
            temperature: 0.6,
        });
        res.status(200).json({ result: completion.data.choices[0].text?.slice(2) });
        } catch(error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
            error: {
                message: 'An error occurred during your request.',
            }
            });
        }
    }
});

module.exports = router;
