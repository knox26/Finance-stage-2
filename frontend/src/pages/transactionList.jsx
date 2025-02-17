import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Add this import
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFinanceStore } from "../store/financeStore.js";
import { Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Toaster, toast } from "react-hot-toast";

const TransactionList = () => {
  const {
    transactions,
    getTransactions,
    updateTransaction,
    deleteTransaction,
  } = useFinanceStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEditTransaction = (index) => {
    const transaction = transactions[index];
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setDate(new Date(transaction.date).toISOString().split("T")[0]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleSaveTransaction = async () => {
    if (!amount || !description || !date) {
      toast.error("Please fill in all fields.");
      return;
    }
    const updatedTransaction = {
      amount: parseFloat(amount),
      description,
      date,
    };
    try {
      await updateTransaction(editIndex, updatedTransaction);
      setAmount("");
      setDescription("");
      setDate("");
      setEditIndex(null);
      setIsDialogOpen(false);
      toast.success("Transaction updated successfully!");
      getTransactions(); // Fetch the updated transactions list
    } catch (error) {
      toast.error("Failed to update transaction.");
    }
  };

  const handleDeleteTransaction = (index) => {
    setDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteTransaction = async () => {
    try {
      await deleteTransaction(deleteIndex);
      setDeleteIndex(null);
      setIsDeleteDialogOpen(false);
      toast.success("Transaction deleted successfully!");
      getTransactions(); // Fetch the updated transactions list
    } catch (error) {
      toast.error("Failed to delete transaction.");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [isDialogOpen, isDeleteDialogOpen]);

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className=" p-1 lg:px-4 mx-auto space-y-6 h-full ">
      <Toaster />

      <CardContent className="p-2 md:p-5 h-full ">
        <h2 className="text-xl font-semibold mb-1">Transaction List</h2>
        <Table className="overflow-y-scroll">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead> {/* New Category column */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-scroll">
            {sortedTransactions.map((tx, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(tx.date)}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>${tx.amount.toFixed(2)}</TableCell>
                <TableCell className="pl-4">{tx.category}</TableCell>{" "}
                {/* Display category */}
                <TableCell className="flex space-x-2 mt-1">
                  <Button
                    onClick={() => handleEditTransaction(index)}
                    className="size-7 md:size-8 lg:size-10"
                  >
                    <Edit className="size-3 lg:size-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteTransaction(index)}
                    className="size-7 md:size-8 lg:size-10"
                  >
                    <Trash className="size-3 lg:size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>
              Update the details of your transaction below.
            </DialogDescription>
          </DialogHeader>
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
          <DialogFooter>
            <Button onClick={handleSaveTransaction}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDeleteTransaction}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionList;
