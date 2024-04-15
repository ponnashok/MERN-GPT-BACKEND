const mongoose = require("mongoose");

//Schema

const historySchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ! Compile to form model

const ContentHistory = mongoose.model("ContentHistory", historySchema);

module.exports = ContentHistory;
