import express from 'express'; // Import Express for handling HTTP requests
import cors from 'cors'; // Import CORS to allow cross-origin requests
import fs from 'fs/promises'; // Import fs (file system) for reading files asynchronously
import { Configuration, OpenAIApi } from 'openai'; // Import OpenAI API configuration
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config({ override: true }); // Load environment variables from .env file

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY); // Log the API key (for debugging, be cautious with logging secrets)

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing for incoming requests

// Configure OpenAI API with API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let promptTemplate = ''; // Variable to store the prompt template
const PORT = process.env.PORT || 5001; // Set the server port from environment variables or default to 5001

// Endpoint to verify a claim using OpenAI chat completions
app.post('/app/verify-claim', async (req, res) => {
  const { claim } = req.body; // Extract 'claim' from request body
  if (!claim) {
    return res.status(400).json({ error: 'Claim is required.' }); // Return error if claim is missing
  }

  try {
    // Replace placeholder in the prompt template if it exists, otherwise append the claim
    const prompt = promptTemplate.includes('<<CLAIM>>')
      ? promptTemplate.replace('<<CLAIM>>', claim)
      : `${promptTemplate}\nClaim: ${claim}`;

    // Send request to OpenAI API for chat completion
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Specify model (can switch to 'gpt-4' if needed)
      messages: [{ role: 'user', content: prompt }], // Provide user input to model
      max_tokens: 150, // Limit the response length
    });

    // Extract response content
    const result = response.data.choices?.[0]?.message?.content?.trim();
    if (!result) {
      return res.status(500).json({ error: 'No response from OpenAI API.' });
    }

    res.json({ result }); // Send result back to the client
  } catch (error) {
    console.error(
      'OpenAI API error:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Failed to verify claim.' });
  }
});

// Function to load prompt file and start the server
const startServer = async () => {
  try {
    promptTemplate = await fs.readFile('prompt.txt', 'utf-8'); // Load prompt template from file
    console.log('Prompt loaded successfully');
  } catch (error) {
    console.error('Error loading prompt.txt:', error);
    process.exit(1); // Exit the process if prompt file fails to load
  }

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer(); // Initialize the server