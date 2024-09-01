const express = require('express');
const path = require('path');
const summarizeText = require('./summarize.js'); // Import your summarization function
require('dotenv').config();

const app = express();
const port = 3000;

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Summarization endpoint
app.post('/summarize', async (req, res) => {
    const text = req.body.text;
    console.log('Received text:', text); // Debugging: log the received text
  
    if (!text || text.length < 200) {
      return res.status(400).json({ error: "Text must be at least 200 characters long." });
    }
  try {
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: "An error occurred while summarizing the text." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
