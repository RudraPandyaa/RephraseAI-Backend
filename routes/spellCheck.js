const express = require("express");
const axios = require("axios");
const spellCheckRoute = express.Router();

spellCheckRoute.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: "Text is required" });
  }

  console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that checks and corrects spelling errors in the following text. Only return the corrected text without any additional comments or context.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    if (!response.data.choices || !response.data.choices[0]?.message?.content) {
      throw new Error("Unexpected response format from OpenAI");
    }

    const correctedText = response.data.choices[0].message.content.trim();
    res.status(200).json({ correctedText });
  } catch (error) {
    console.error("Spellcheck error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = spellCheckRoute;
