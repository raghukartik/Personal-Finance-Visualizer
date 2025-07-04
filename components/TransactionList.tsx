"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionList({
  refreshTrigger,
  onChange,
}: {
  refreshTrigger: number;
  onChange: () => void;
}) {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "Other",
  });

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    if (data.success) setTransactions(data.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    onChange();
  };

  const startEditing = (tx: any) => {
    setEditingId(tx._id);
    setFormData({
      amount: tx.amount,
      description: tx.description,
      date: tx.date.split("T")[0], // format for input[type="date"]
      category: tx.category || "Other",
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/transactions/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(formData.amount),
        description: formData.description,
        date: formData.date,
        category: formData.category,
      }),
    });

    setEditingId(null);
    onChange(); // refresh chart + list
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      <ul className="space-y-4">
        {transactions.map((tx: any) => (
          <li key={tx._id} className="border p-3 rounded space-y-2">
            {editingId === tx._id ? (
              <form onSubmit={handleEditSubmit} className="space-y-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
                <Input
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm"
                >
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Rent">Rent</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
                <div className="flex gap-2">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">₹{tx.amount}</p>
                  <p className="text-sm text-gray-500">{tx.description}</p>
                  <p className="text-xs">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => startEditing(tx)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(tx._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
