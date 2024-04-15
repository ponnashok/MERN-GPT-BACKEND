const asyncHandler = require("express-async-handler");
const axios = require("axios");
const { model } = require("mongoose");

// ---- OPEN-AI Controller ----

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: `generate a blog post ${prompt}`,
        max_tokens: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {}
});

module.exports = {
  openAIController,
};
