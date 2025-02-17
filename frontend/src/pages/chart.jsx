import { useFinanceStore } from "../store/financeStore.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const Chart = () => {
  const { transactions } = useFinanceStore();

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = transaction.amount;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  return (
    <div className="space-y-6 md:flex space-x-3  ">
      <Card className='h-full p-2 w-full'>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sortedTransactions.map((tx) => ({
                ...tx,
                date: formatDate(tx.date),
              }))}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className='h-full p-2 w-full'>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Category-wise Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
