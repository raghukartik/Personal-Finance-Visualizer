"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetChart({
  month,
  refreshTrigger,
}: {
  month: string;
  refreshTrigger: number;
}) {
  type BudgetDataItem = {
    category: string;
    budget: number;
    actual: number;
  };
  const [data, setData] = useState<BudgetDataItem[]>([]);

  type BudgetItem = {
    month: string;
    category: string;
    amount: number;
  };

  useEffect(() => {
    const fetchChart = async () => {
      const txRes = await fetch("/api/transactions");
      const txData = (await txRes.json()).data;
      const budgetRes = await fetch("/api/budgets");
      const budgetData: BudgetItem[] = (await budgetRes.json()).data;

      const txByCategory = new Map<string, number>();

      txData.forEach((tx: { date: string; category: string; amount: number }) => {
        if (tx.date.startsWith(month)) {
          txByCategory.set(
            tx.category,
            (txByCategory.get(tx.category) || 0) + tx.amount
          );
        }
      });

      const chartData = budgetData
        .filter((b: BudgetItem) => b.month === month)
        .map((b: BudgetItem) => ({
          category: b.category,
          budget: b.amount,
          actual: txByCategory.get(b.category) || 0,
        }));

      setData(chartData);
    };

    fetchChart();
  }, [month, refreshTrigger]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      {data.some((item) => item.actual > item.budget) && (
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-semibold text-red-600">
            Spending Warnings 🚨
          </h3>
          {data.map((item) =>
            item.actual > item.budget ? (
              <div key={item.category} className="text-sm text-red-500">
                • {item.category}: Exceeded by ₹{item.actual - item.budget}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
