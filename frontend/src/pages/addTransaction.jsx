import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFinanceStore } from "../store/financeStore.js";
import { Toaster, toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { addTransaction } = useFinanceStore();

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Bills",
  ];

  const handleAddTransaction = async () => {
    if (!amount || !description || !date || !category) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await addTransaction({
        amount: parseFloat(amount),
        description,
        date,
        category,
      });
      setAmount("");
      setDescription("");
      setDate("");
      setCategory(""); // Reset category
      toast.success("Transaction added successfully!");
    } catch (error) {
      toast.error("Failed to add transaction.");
    }
  };

  return (
    <div className="p-1 lg:p-2 max-w-2xl mx-auto space-y-6 md:space-y-0 h-full">
      <Toaster />

      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Add Transaction</h2>
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddTransaction}>Add</Button>
      </CardContent>
    </div>
  );
};

export default AddTransaction;
