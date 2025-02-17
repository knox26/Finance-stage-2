import Transaction from "../models/transaction-model.js";

export const addTransaction = async (req, res) => {
  try {
    const { description, amount, date, category } = req.body;
    if (!description || !amount || !date || !category) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const newTransaction = new Transaction({
      description,
      amount,
      date,
      category,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
    console.log("haha");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("err in trn ctrl " + err);
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date, category } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { description, amount, date, category },
      { new: true }
    );
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
