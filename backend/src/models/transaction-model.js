import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  date: {
    type: Date,
    required: [true, "Please add a date"],},
  category: {
    type: String,
    required: [true, "Please add a category"],
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
