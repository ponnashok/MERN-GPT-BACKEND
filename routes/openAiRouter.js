const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const { openAIController } = require("../controller/openAIController");

const openAiRouter = express.Router();

openAiRouter.post("/generate-content", isAuthenticated, openAIController);

module.exports = openAiRouter;
