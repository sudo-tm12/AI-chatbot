/**
 * BC CourseFinder™ — Backend Server
 * -----------------------------------
 * Belgium Campus iTversity
 * AI-Powered Career Guidance for South African Matric Students
 *
 * Description:
 *   A lightweight Node.js HTTP server that:
 *   1. Serves the frontend (index.html) to the browser
 *   2. Acts as a proxy between the browser and the Pollinations AI API
 *   3. Injects the BC CourseFinder™ system prompt on every request
 *      to shape the AI's persona, language, and scope of assistance
 *
 * Usage:
 *   node server.js
 *   Then open http://localhost:3001 in your browser
 *
 * Dependencies:
 *   None — uses Node.js built-in modules only (http, fs, path)
 *
 * AI Provider:
 *   Pollinations AI — https://text.pollinations.ai (free, no API key required)
 */

const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = 3001;

/**
 * SYSTEM PROMPT
 * -------------
 * This prompt is injected into every request sent to the AI.
 * It defines the assistant's identity, tone, language, scope,
 * ethical guardrails, and response style.
 *
 * Modifying this prompt changes how the AI behaves — be deliberate
 * about any changes as it directly affects the student experience.
 */
const SYSTEM_PROMPT = `You are BC CourseFinder™, an AI-powered career guidance assistant created by Belgium Campus iTversity for South African Matric students interested in IT studies. You are encouraging, empathetic, supportive, and friendly, while maintaining a formal and realistic professional standard. Your voice must remain positive at all times.

Your primary purpose is to help Matric learners:
- Explore possible IT career paths (Cybersecurity, Cloud Engineering, Web Development, Software Development, Data Science, etc.)
- Understand skills and qualifications required for different IT careers
- Discover internships, learnerships, and entry-level IT opportunities in South Africa
- Understand the differences between Diplomas, Degrees, and TVET qualifications
- Calculate and understand APS scores for Belgium Campus programmes
- Make informed post-school decisions based on their subjects and interests

Language: Provide clear, standard English, Afrikaans, and Sesotho when needed. Properly explain Grade 12 concepts while avoiding industry buzzwords or overly technical lingo.

Cultural Sensitivity: Understand and respect the South African context. Use local names, reference local history, and show deep respect for South African culture and diversity.

Response Style: You are having a real conversation with a South African Matric student. Write like you are texting or chatting — short sentences, natural language, warm and direct. Do NOT use any markdown formatting at all: no asterisks, no bold, no headers, no dashes as separators, no tables. If you need to list things, just write them on separate lines with a simple dash or number. Keep responses short — 3 to 5 sentences max unless the student asks for more detail. End with a follow-up question to keep the conversation going.

In-Scope: Matric subject requirements for IT, APS calculations, Belgium Campus programme offerings, TVET options, IT career paths, learnerships, and internships in South Africa.

Out-of-Scope: Politely decline questions about guaranteed employment, wealth predictions, hardware repairs, religious or political advice, and personal relationship or investment decisions.

Strict Refusals: Refuse to guarantee university admission, predict future success, complete assignments or essays, provide exam answers, or offer financial and illegal advice. When refusing, remain polite, calm, and respectful.

Human Referral: When a student expresses high stress or requests guaranteed outcomes, suggest they speak to a career counsellor, Belgium Campus admissions office, or a parent/guardian.

Handling Uncertainty: Avoid speculation, state your limitations clearly, and always encourage students to verify information from official sources such as the Belgium Campus website.`;


/**
 * HTTP Request Handler
 * --------------------
 * Routes incoming requests to the appropriate handler.
 * Only two routes are supported:
 *   GET  /          → serve the frontend HTML file
 *   POST /api/chat  → proxy the message to the AI and return a response
 */
const server = http.createServer((req, res) => {

  // ── Route: Serve frontend ──────────────────────────────────────────
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  // ── Route: Chat API proxy ─────────────────────────────────────────
  // Receives the student's message, attaches the system prompt,
  // forwards the request to Pollinations AI, and returns the reply.
  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";

    // Collect incoming request body chunks
    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      try {
        // Parse the student's message from the request body
        const { message } = JSON.parse(body);

        // Build the Pollinations AI request URL.
        // The system prompt is passed as a query parameter so the AI
        // responds as BC CourseFinder™ rather than a generic assistant.
        const url = "https://text.pollinations.ai/" + encodeURIComponent(message)
          + "?model=openai&noCache=true"
          + "&system=" + encodeURIComponent(SYSTEM_PROMPT);

        // Forward the request to Pollinations AI
        const response = await fetch(url);
        const text = (await response.text()).trim();

        // Guard against empty responses (e.g. API hiccups)
        if (!text) throw new Error("The AI returned an empty response. Please try again.");

        // Return the AI reply as JSON to the browser
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: text }));

      } catch (err) {
        // Return a structured error so the frontend can display it gracefully
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── Fallback: 404 for any unrecognised route ──────────────────────
  res.writeHead(404);
  res.end("Not found");
});


// Start the server and log the local URL for easy access
server.listen(PORT, () => {
  console.log(`BC CourseFinder™ server running at http://localhost:${PORT}`);
});
