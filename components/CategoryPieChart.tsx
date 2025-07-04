"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F", "#d0ed57"];

export default function CategoryPieChart({ refreshTrigger }: { refreshTrigger: number }) {
  type Transaction = {
    category: string;
    amount: number;
    // add other fields if needed
  };

  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(({ data }) => {
        const categoryMap = new Map<string, number>();
        (data as Transaction[]).forEach((tx: Transaction) => {
          categoryMap.set(tx.category, (categoryMap.get(tx.category) || 0) + tx.amount);
        });
        const formatted = Array.from(categoryMap, ([name, value]) => ({ name, value }));
        setData(formatted);
      });
  }, [refreshTrigger]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
