import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Configure OpenAI API with the key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define an endpoint to verify a claim
app.post('/app/verify-claim', async (req, res) => {
    const { claim } = req.body;

    if (!claim) {
        return res.status(400).json({ error: 'Claim is required.' });
    }

    try {
        const prompt = fs.readFileSync('prompt.txt', 'utf-8');

        const response = await openai.createCompletion({
            model: 'gpt-4o-mini',
            prompt: prompt,
            max_tokens: 150,
        });

        res.json({ result: response.data.choices[0].text.trim() });

    } catch (error) {
        console.error('OpenAI API error', error);
        res.status(500).json({ error: 'Failed to verify claim.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
