"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function BudgetForm({ onSuccess }: { onSuccess: () => void }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim and validate inputs
    const trimmedCategory = category.trim();
    const trimmedMonth = month.trim();
    const parsedAmount = Number(amount);

    // Validation
    if (!trimmedCategory || !trimmedMonth || !amount) {
      alert("All fields are required.");
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }

    try {
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: trimmedCategory,
          amount: parsedAmount,
          month: trimmedMonth,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        alert(`Failed to add budget: ${message || response.statusText}`);
        return;
      }

      setAmount("");
      onSuccess(); // Assuming this reloads or updates the UI
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <div>
        <label className="block mb-1">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Food",
              "Transport",
              "Rent",
              "Shopping",
              "Entertainment",
              "Other",
            ].map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1">Month (YYYY-MM)</label>
        <Input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="2025-07"
        />
      </div>
      <div>
        <label className="block mb-1">Amount</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button type="submit">Set Budget</Button>
    </form>
  );
}
