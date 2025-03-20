import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config( {override: true});

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);


const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let promptTemplate = '';
const PORT = process.env.PORT || 5001;

// Endpoint to verify a claim using the chat completions endpoint
app.post('/app/verify-claim', async (req, res) => {
  const { claim } = req.body;
  if (!claim) {
    return res.status(400).json({ error: 'Claim is required.' });
  }

  try {
    // Prepare the prompt, optionally replacing a placeholder if it exists
    const prompt = promptTemplate.includes('<<CLAIM>>')
      ? promptTemplate.replace('<<CLAIM>>', claim)
      : `${promptTemplate}\nClaim: ${claim}`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Change to 'gpt-4' if available and desired
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    const result = response.data.choices?.[0]?.message?.content?.trim();
    if (!result) {
      return res.status(500).json({ error: 'No response from OpenAI API.' });
    }

    res.json({ result });
  } catch (error) {
    console.error(
      'OpenAI API error:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Failed to verify claim.' });
  }
});

// Load prompt file and start the server
const startServer = async () => {
  try {
    promptTemplate = await fs.readFile('prompt.txt', 'utf-8');
    console.log('Prompt loaded successfully');
  } catch (error) {
    console.error('Error loading prompt.txt:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
