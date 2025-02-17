import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import "./App.css";
import { useFinanceStore } from "./store/financeStore.js";
import { Toaster } from "react-hot-toast";
import AddTransaction from "./pages/addTransaction";
import TransactionList from "./pages/transactionList";
import Chart from "./pages/chart";
import Summary from "./pages/Summery.jsx";

function App() {
  const { getTransactions } = useFinanceStore();

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 h-full ">
      <Toaster />
      <div className=" md:flex  gap-4 w-full space-y-6 md:space-y-0 justify-center items-center">
        <Card className="md:w-[30%] ">
          <AddTransaction />
        </Card>
        <Card className="md:w-full  max-h-[46vh] overflow-y-scroll md:overflow-y-hidden p-2 md:p-0">
          <TransactionList />
        </Card>
      </div>
      <div>
        <Summary />
      </div>
      <div className="w-full ">
        <Chart />
      </div>
    </div>
  );
}

export default App;
