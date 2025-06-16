# SQL Query Generator

A full-stack application that generates SQL queries from natural language questions using OpenRouter AI.

## Features

- Natural language to SQL query conversion
- Clean, responsive React frontend
- Secure Express.js backend API
- Strict SQL-only output formatting

## Technology Stack

- **Frontend**: React 18, Axios
- **Backend**: Node.js, Express, OpenRouter API
- **Build Tools**: npm, React Scripts

## Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- OpenRouter API key

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenRouter API key:
   ```env
   OPENAI_API_KEY=your_openrouter_api_key_here
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the backend server (from backend directory):
   ```bash
   npm start
   ```
2. In a separate terminal, start the frontend (from frontend directory):
   ```bash
   npm start
   ```
3. The application will open in your default browser at `http://localhost:3000`

## API Documentation

### POST /api/ask

Generates SQL queries from natural language questions.

**Request Body:**
```json
{
  "question": "your natural language question"
}
```

**Successful Response:**
```json
{
  "answer": "generated SQL query"
}
```

**Error Responses:**
- 400 Bad Request: Missing question
- 500 Internal Server Error: API request failed

## Configuration

The following environment variables can be configured:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenRouter API key |
| `PORT` | No | Backend port (default: 5000) |

## License

This project is licensed under the MIT License.
