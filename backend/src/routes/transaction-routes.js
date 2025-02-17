import express from "express";
import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controller/transaction-controller.js";

const router = express.Router();

router.post("/add-transactions", addTransaction);
router.get("/get-transactions", getTransactions);
router.put("/update-transaction/:id", updateTransaction);
router.delete("/delete-transaction/:id", deleteTransaction);

export default router;
