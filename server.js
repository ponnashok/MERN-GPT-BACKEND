const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleWare");
const openAiRouter = require("./routes/openAiRouter");
require("./utils/connectDB")();

const app = express();
const PORT = process.env.PORT || 5000;

//-------MiddleWare-------
app.use(express.json()); // pass incoming json data
app.use(cookieParser()); // Pass cookie Automatically

//-------Routes-------
app.use("/api/v1/users", userRouter);
app.use("/api/v1/openai", openAiRouter);

//-------ErrorHandlerMiddleware-------
app.use(errorHandler);

// Start of Server
app.listen(PORT, console.log(`server is running on port ${PORT}`));
