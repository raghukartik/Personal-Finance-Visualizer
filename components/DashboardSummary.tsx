"use client";

import { useEffect, useState } from "react";

export default function DashboardSummary({ refreshTrigger }: { refreshTrigger: number }) {
  const [summary, setSummary] = useState({ total: 0, latest: [] });

  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(({ data }) => {
        const total = data.reduce((acc: number, tx: any) => acc + tx.amount, 0);
        const latest = data.slice(0, 3);
        setSummary({ total, latest });
      });
  }, [refreshTrigger]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-sm text-gray-500">Total Spent</h3>
        <p className="text-2xl font-bold">₹{summary.total}</p>
      </div>
      <div className="bg-white p-4 rounded shadow md:col-span-2">
        <h3 className="font-semibold text-sm text-gray-500 mb-2">Recent Transactions</h3>
        <ul className="space-y-1 text-sm">
          {summary.latest.map((tx: any) => (
            <li key={tx._id}>
              ₹{tx.amount} – {tx.description} ({tx.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
