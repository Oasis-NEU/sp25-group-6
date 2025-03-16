// server.js (import required modules)
const express = require('express'); // Import Express.js framework
const cors = require('cors'); // Import CORS middleware for handling cross-origin requests
const bodyParser = require('body-parser'); // Middleware to parse JSON request bodies
const OpenAI = require("openai"); // Import OpenAI SDK
const fs = require('fs'); // File system module for reading files
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Initialize Express app

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Configure OpenAI API with the key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define an endpoint to verify a claim
app.post('/app/verify-claim', async (req, res) => {
    const { claim } = req.body; // Extract the claim from request body

    // Check if claim is provided
    if (!claim) {
        return res.status(400).json({ error: 'Claim is required.' }); // Return an error if claim is missing
    }

    try {
        // Read prompt content from file
        const prompt = fs.readFileSync('prompt.txt', 'utf-8');

        // Send a request to OpenAI API for text completion
        const response = await openai.createCompletion({
            model: 'gpt-4o-mini', // Specify the model to use
            prompt: prompt, // Use the prompt from the file
            max_tokens: 150, // Limit the response length
        });

        // Send back the result to the client
        res.json({ result: response.data.choice[0].text.trim() });

    } catch (error) {
        console.error('OpenAI API error', error); // Log any errors
        res.status(500).json({ error: 'Failed to verify claim.' }); // Return an error response
    }
});

// Start the server on the specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
