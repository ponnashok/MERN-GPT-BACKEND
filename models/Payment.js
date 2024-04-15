const mongoose = require("mongoose");

//Schema

const paymentSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    subcriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    montlyRequestCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ! Compile to form model

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
