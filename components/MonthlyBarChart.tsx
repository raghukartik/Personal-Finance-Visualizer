"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ refreshTrigger }: { refreshTrigger: number }) {
  const [chartData, setChartData] = useState<{ name: string; total: number }[]>([]);

  type Transaction = {
    date: string;
    amount: number;
    // add other fields if needed
  };

  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const monthly = new Map();

          data.data.forEach((tx: Transaction) => {
            const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
            monthly.set(month, (monthly.get(month) || 0) + tx.amount);
          });

          const formatted = Array.from(monthly, ([name, total]) => ({ name, total }));
          setChartData(formatted);
        }
      });
  }, [refreshTrigger]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
