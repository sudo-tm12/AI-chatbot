# BC CourseFinder™

**Belgium Campus iTversity — AI-Powered Career Guidance for South African Matric Students**

BC CourseFinder™ is a conversational AI assistant that helps Grade 12 learners explore IT career paths, understand qualification requirements, calculate APS scores, and make informed post-school decisions aligned with Belgium Campus IT programmes.

---

## Features

- Conversational AI guidance powered by Pollinations AI (free, no API key required)
- Covers IT career paths, APS calculations, Diploma vs Degree comparisons, learnerships, and internships
- Responds in English, Afrikaans, and Sesotho
- Culturally sensitive to the South African context
- Ethical guardrails — refuses to complete assignments, guarantee admission, or give illegal advice
- Clean, premium UI inspired by Apple and Google design principles
- Quick-start suggestion chips for common student questions

---

## Project Structure

```
bc-coursefinder/
├── index.html   — Frontend: chat UI (HTML + CSS + Vanilla JS)
├── server.js    — Backend: Node.js proxy server
├── diagram.html — System architecture diagram (open in browser)
└── README.md    — Project documentation
```

---

## How It Works

```
Student (Browser)  →  POST /api/chat  →  Node.js Server  →  Pollinations AI
                   ←  JSON reply      ←                  ←  Plain text response
```

1. The student types a message in the chat window
2. The browser sends it to the Node.js server via `POST /api/chat`
3. The server attaches the BC CourseFinder™ system prompt and forwards it to Pollinations AI
4. The AI generates a short, conversational response
5. The server returns it as JSON and the browser renders it as a chat bubble

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher

### Run Locally

```bash
# Clone the repository
git clone https://github.com/sudo-tm12/AI-chatbot.git
cd AI-chatbot

# Start the server (no npm install needed — zero dependencies)
node server.js

# Open in your browser
http://localhost:3001
```

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript     |
| Backend  | Node.js (built-in `http` module)    |
| AI       | Pollinations AI (OpenAI model)      |
| Fonts    | Inter, JetBrains Mono (Google Fonts)|

---

## Scope of Assistance

**In-Scope:**
- Matric subject requirements for IT programmes
- APS score calculations for Belgium Campus
- Diploma vs Degree vs TVET comparisons
- IT career paths (Cybersecurity, Cloud, Web Dev, Data Science, etc.)
- Learnerships and internships in South Africa

**Out-of-Scope:**
- Guaranteed employment or admission predictions
- Assignment or exam completion
- Financial, legal, or personal relationship advice
- Hardware repairs or political/religious topics

---

## Innovation & Leadership Project
Belgium Campus iTversity — 2025
