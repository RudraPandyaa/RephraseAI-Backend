const express = require("express");
const spellCheckRoute = express.Router();
const axios = require("axios")
spellCheckRoute.post('/',async(req,res)=>{
    const { text } = req.body;
    try {
                const response = await axios.post("https://api.openai.com/v1/chat/completions",{
                    model:"gpt-4o-mini",
                    messages:[
                        {
                            role: "system",
                            content: "You are a helpful assistant that checks and corrects spelling errors in the following text. Only return the corrected text without any additional comments or context."
                        },
                        {
                            role: "user",
                            content: `${text}`,
                        }
                    ],
                    max_tokens: 150,
                    n: 1,
                    stop: null,
                    temperature: 0.7,
                },
                {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    }
                }
            );
            
            const correctedText = response.data.choices[0].message.content.trim();

            res.status(200).json({ correctedText });
            } 
            catch (error) {
                res.status(500).json({error:error.message})
            }
})

module.exports = spellCheckRoute;