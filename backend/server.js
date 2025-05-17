const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Question is required' });

  // Stricter instruction
  const systemInstruction = 'You are an expert SQL generator. For every question, return ONLY the SQL query, with no explanation, no code block formatting, and no extra text. Do not include any markdown or commentary. Only output the SQL query as plain text.';
  const messages = [
    { role: 'system', content: systemInstruction },
    { role: 'user', content: question }
  ];

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'qwen/qwq-32b:free',
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    let answer = response.data.choices[0].message.content.trim();

    // Post-process: extract SQL from code block or plain text
    const codeBlockMatch = answer.match(/```(?:sql)?\n([\s\S]*?)```/i);
    if (codeBlockMatch) {
      answer = codeBlockMatch[1].trim();
    } else {
      // Remove any leading/trailing markdown or explanation
      answer = answer.replace(/^```[a-zA-Z]*|```$/g, '').trim();
      // If still multiple lines, take only the first SQL-looking line
      const lines = answer.split('\n').filter(line => line.trim());
      if (lines.length > 1 && !lines[0].toLowerCase().startsWith('select') && !lines[0].toLowerCase().startsWith('show') && !lines[0].toLowerCase().startsWith('insert') && !lines[0].toLowerCase().startsWith('update') && !lines[0].toLowerCase().startsWith('delete')) {
        answer = lines.find(line => /select|show|insert|update|delete/i.test(line)) || lines[0];
      } else {
        answer = lines[0];
      }
    }

    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error || err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 