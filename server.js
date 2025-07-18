const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/royce', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are Royce, a helpful AI assistant.' },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const royceReply = response.data.choices[0].message.content;
    res.json({ reply: royceReply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get response from OpenAI.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Royce AI backend running on port ${PORT}`));
