import { useFinanceStore } from "../store/financeStore.js";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Summary = () => {
  const { transactions, getTransactions } = useFinanceStore();

  useEffect(() => {
    getTransactions();
  }, []);

  const totalExpenses = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const latestTransaction = transactions.slice(-1)[0];

  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = transaction.amount;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-x-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-start">
          <h2 className="text-xl font-semibold">Total Expenses</h2>
          <div>
            <p className="text-xl mt-3">${totalExpenses.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      {latestTransaction && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-3">
              Latest <br />
              Transaction
            </h2>
            <div>
              <p className="text-md">{formatDate(latestTransaction.date)}</p>
              <p className="text-md">${latestTransaction.amount.toFixed(2)}</p>
              <p className="text-md">{latestTransaction.category}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(categoryData).map((category) => (
        <Card key={category}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">
              {category} <br />
              Expenses
            </h2>
            <p className="text-xl mt-3">${categoryData[category].toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Summary;
