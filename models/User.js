const mongoose = require("mongoose");

//Schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    trialPeriod: {
      type: Number,
      default: 3,
    },
    trialActive: {
      type: Boolean,
      default: true,
    },
    trialExpires: {
      type: Date,
    },
    subcription: {
      type: String,
      enum: ["Trial", "Free", "Basic", "Premium"],
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    montlyRequestCount: {
      type: Number,
      default: 0,
    },
    nextBillingDate: Date,
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    contentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contentHistory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ! Compile to form model

const User = mongoose.model("User", userSchema);

module.exports = User;
