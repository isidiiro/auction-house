const { Schema, model } = require("mongoose");
const mongoose = require('mongoose')

const otpSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true
    },
    otp: {
      type: String,
      required: true,
    },
    expires: { type: Date, default: Date.now, index: { expires: "1h" } },
  },
  { timestamps: true }
);

const otpModel = model("Otp", otpSchema);

module.exports = otpModel;
