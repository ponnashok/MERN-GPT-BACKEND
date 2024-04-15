const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ponnashok876:Ponnymass876@mern-ai.lydynrp.mongodb.net/mern-ai?retryWrites=true&w=majority"
    );
    console.log(`MongoDb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error in connection to MongoDB ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
