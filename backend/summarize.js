require('dotenv').config();
const axios = require('axios');

async function summarizeText(text) {


let data = JSON.stringify({
  "inputs": text,
  "parameters": {
    "max_length": 100,
    "min_length": 30
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ` + process.env['HUGGING_FACE_API_KEY']
  },
  data : data
};

try {
    const response = await axios.request(config); // API Call
    return response.data[0].summary_text
}
catch (error) {
    console.log(error);
    }
}

 
module.exports = summarizeText;