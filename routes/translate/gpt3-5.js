router.post("/", async (req, res) => {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: { message: "OpenAI API key not configured, please follow instructions in README.md" }
        });
        return;
    }

    const url = 'https://api.openai.com/v1/chat/completions'
    const system = `You are an English to Dari translator.`;
    const response = 'You can only respond using letters from the English alphabet.';
    const content = `Translate the following text into Afghan Dari. You can only respond using letters from the ISO basic English alphabet. ${req.body.text}`;
    const prompt = system + response + content;
    const prompt2 = `Translate ${req.body.tex} to Afghan Dari using only  the Latin alphabet.`;
    
    const messages = [
        // { role: "system", content: system },
        // { role: "system", content: response },
        { role: "user", content: prompt2 },
    ];


    const raw = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.7
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        console.log('result: ', result?.choices[0])
        return result
    } catch (error) {
        console.error(error);
    }
});