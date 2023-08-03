const router = require("express").Router();
const config = require("../../config");
const { configuration, openai } = config;

router.post("/", async (req, res) => {
    const text = req.body.text || '';
    const messages = [
        { role: "system", content: 'You will be provided with a sentence in English, and your task is to translate it to Afghan Dari using only the Latin alphabet.' },
        { role: "user", content: text },
    ];

    if (!configuration.apiKey) {
        res.status(500).json({
            error: { message: "OpenAI API key not configured, please follow instructions in README.md" }
        });
        return;
    }

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages,
            temperature: 0,
            max_tokens: 256,
        });
        const result = response?.data?.choices[0]?.message?.content;
        res.status(200).json(result);
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
