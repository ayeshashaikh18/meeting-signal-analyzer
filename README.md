# Meeting Signal Analyzer

An AI-powered web application that analyzes sales meeting transcripts and identifies key conversation signals such as buying interest, objections, and confusion. The application also provides actionable coaching tips to help sales representatives improve their conversations and increase conversion opportunities.

## Features

* Analyze sales meeting transcripts using AI
* Detect buying interest signals
* Detect objections and concerns
* Detect confusion or unclear understanding
* Generate coaching tips for each detected signal
* Modern and responsive user interface
* JSON-based API response structure

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### AI

* OpenRouter API
* Google Gemma 4 31B (Free)

## Project Structure

```text
meeting-signal-analyzer/

├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd meeting-signal-analyzer
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 4. Start the Backend Server

```bash
node server.js
```

Server will run on:

```text
http://localhost:5000
```

### 5. Launch the Frontend

Open:

```text
frontend/index.html
```

in your browser.

## API Endpoint

### POST /analyse

#### Request

```json
{
  "transcript": "Rep: Pricing starts at $500/month. Prospect: That seems expensive."
}
```

#### Response

```json
{
  "signals": [
    {
      "type": "objection",
      "quote": "That seems expensive.",
      "tip": "Discuss ROI and value before addressing pricing."
    }
  ]
}
```

## Signal Types

### Buying Interest

Indicates positive engagement, curiosity, or purchase intent.

### Objection

Highlights concerns regarding price, implementation, competition, or other barriers.

### Confusion

Identifies unclear understanding, unanswered questions, or misunderstandings.

## Example Transcript

```text
Rep: Our software automates reporting.

Prospect: This looks interesting.

Rep: Pricing starts at $500/month.

Prospect: That seems expensive.
```

## Future Improvements

* User authentication
* Transcript history
* Download analysis reports
* CRM integration
* Real-time meeting analysis
* Advanced sentiment analysis

## Assignment Information

Built as part of the NimitAI Intern Assignment.

Objective: Build a web application that analyzes meeting transcripts and returns AI-detected sales signals with coaching recommendations.

## Author

Ayesha Shaikh
