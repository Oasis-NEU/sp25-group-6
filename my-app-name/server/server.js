// server.js (import)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Config openAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/app/verify-claim', async (req,res) => {
    const { claim } = req.body;
    if (!claim) {
        return res.status(400).json({ error: 'Claim is required.'});
    }

    try {
        const prompt = fs.readFileSync('prompt.txt', 'utf-8');

        const response = await openai.createCompletion({
            model: 'gpt-4o-mini',
            prompt: prompt,
            max_tokens: 150,
        });

        res.json({ result: response.data.choice[0].text.trim()});
    } catch (error) {
        console.error('OpenAI API error', error);
        res.status(500).json({ error: 'Failed to verify claim.'});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 