import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useFinanceStore = create((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),

  getTransactions: async () => {
    const response = await axiosInstance.get("/api/get-transactions");
    const data = response.data;
    set({ transactions: Array.isArray(data) ? data : [] });
  },

  addTransaction: async (transaction) => {
    await axiosInstance.post("/api/add-transactions", transaction);
    set((state) => ({ transactions: [...state.transactions, transaction] }));
  },

  updateTransaction: async (index, updatedTransaction) => {
    set((state) => {
      const transactionId = state.transactions[index]._id;
      return axiosInstance
        .put(`/api/update-transaction/${transactionId}`, updatedTransaction)
        .then((response) => {
          const data = response.data;
          const transactions = [...state.transactions];
          transactions[index] = data;
          return { transactions };
        });
    });
  },

  deleteTransaction: async (index) => {
    set((state) => {
      const transactionId = state.transactions[index]._id;
      return axiosInstance
        .delete(`/api/delete-transaction/${transactionId}`)
        .then(() => {
          const transactions = state.transactions.filter((_, i) => i !== index);
          return { transactions };
        });
    });
  },
}));
