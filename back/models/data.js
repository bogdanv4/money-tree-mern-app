const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    income: {
      type: Number,
      required: [true, "Please add an income"],
    },
    outcome: {
      type: Number,
      required: [true, "Please add an outcome"],
    },
    savings: {
      type: Number,
      required: [true, "Please add a saving"],
    },
    date: {
      type: String,
      required: [true, "Please add a date (month/year)"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add an user id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);
