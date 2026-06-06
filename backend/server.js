const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);
app.use(express.json());

console.log(
  "OpenRouter Key Loaded:",
  process.env.OPENROUTER_API_KEY ? "YES" : "NO"
);

app.post("/analyse", async (req, res) => {
  try {
    console.log("Request received");

    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({
        error: "Transcript is required",
      });
    }

    const prompt = `
You are a sales coaching assistant.

Analyze the transcript and identify:
- buying_interest
- objection
- confusion

Return ONLY valid JSON.

Rules:
- Use exactly these type values:
  - buying_interest
  - objection
  - confusion
- No markdown
- No explanations
- No code blocks

Format:

{
  "signals": [
    {
      "type": "buying_interest",
      "quote": "",
      "tip": ""
    }
  ]
}

Transcript:
${transcript}
`;

    console.log("Sending request to OpenRouter...");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-4-31b-it:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    console.log("OpenRouter responded");

    const text = response.data.choices[0].message.content;

    console.log("RAW RESPONSE:");
    console.log(text);

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let data;

    try {
      data = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON Parse Error:");
      console.error(parseError);

      return res.status(500).json({
        error: "Model returned invalid JSON",
        rawResponse: text,
      });
    }

    res.json(data);

  } catch (error) {
    console.error("ERROR:");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    res.status(500).json({
      error: "Analysis failed",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("NimitAI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});