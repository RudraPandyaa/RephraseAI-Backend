require("dotenv").config();
const express = require("express")
const cors = require("cors");
const analyzeRoute = require("./routes/analyze");
const grammarCheckRoute = require("./routes/grammerCheck");
const spellCheckRoute = require("./routes/spellCheck");
const app = express();
const PORT = process.env.PORT || 5000
//  https://api.openai.com/v1/chat/completions
// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://rephrase--ai.vercel.app/"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json())

// Routes
app.use("/api/analyze", analyzeRoute)
app.use("/api/grammarCheck", grammarCheckRoute)
app.use("/api/spellcheck", spellCheckRoute)

// Start server
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})