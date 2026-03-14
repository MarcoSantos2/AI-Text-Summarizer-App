require('dotenv').config();
const axios = require('axios');

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const INFERENCE_URL = 'https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn';
// BART max sequence length is 1024 tokens; ~4 chars per token → safe character limit
const MAX_INPUT_CHARS = 4000;

async function summarizeText(text) {
  if (!HUGGING_FACE_API_KEY) {
    throw new Error('HUGGING_FACE_API_KEY is not set. Add it to your .env file.');
  }

  const truncatedText = text.length > MAX_INPUT_CHARS
    ? text.slice(0, MAX_INPUT_CHARS) + '…'
    : text;

  const data = JSON.stringify({
    inputs: truncatedText,
    parameters: {
      max_length: 400,
      min_length: 30,
      truncation: 'longest_first'
    }
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: INFERENCE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`
    },
    data
  };

  try {
    const response = await axios.request(config);
    const data = response.data;
    // Handle both array format (old API) and object format (router API)
    const summary = Array.isArray(data) ? data[0]?.summary_text : data?.summary_text;
    if (summary == null) {
      throw new Error(`Unexpected API response format: ${JSON.stringify(data).slice(0, 200)}`);
    }
    return summary;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(`Hugging Face API: ${error.response.data.error}`);
    }
    throw error;
  }
}

 
module.exports = summarizeText;