import React, { useState } from 'react';
import axios from 'axios';

function AskLLM() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    try {
      const res = await axios.post('http://localhost:5000/api/ask', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('Error: ' + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <div>
      <form className="llm-form" onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="llm-input" className="llm-label" style={{display: 'none'}}>Ask a question</label>
        <input
          id="llm-input"
          className="llm-input"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          disabled={loading}
          autoFocus
        />
        <button className="llm-button" type="submit" disabled={loading || !question.trim()}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
      {answer && (
        <div className="llm-answer">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default AskLLM; 