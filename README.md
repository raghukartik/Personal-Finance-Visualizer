# 💰 Personal Finance Visualizer

A simple full-stack web app to track your personal finances, visualize spending, and manage budgets.

---

## 🚀 Features

###  Transaction Tracking
- Add / Edit / Delete transactions (amount, date, description)
- View all transactions in a list
- Monthly bar chart for expenses
- Basic form validation

###  Categories
- Predefined categories for transactions (Food, Rent, Shopping, etc.)
- Category-wise pie chart visualization
- Dashboard cards: total expenses, category breakdown, recent transactions

### Budgeting
- Set monthly category-wise budgets
- Budget vs Actual comparison chart (stacked bars)
- Spending insights when budget is exceeded

---

## 🧱 Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI
- **Charts:** Recharts
- **Backend:** Next.js API routes (App Router)
- **Database:** MongoDB (via Mongoose)
- **Styling:** TailwindCSS + Shadcn UI components

---

## 📁 Folder Structure (Highlights)

```
/components        -> Reusable UI components (forms, charts, list)
/app/api           -> API routes for transactions & budgets
/lib/models        -> Mongoose schemas
/lib/mongodb.ts    -> MongoDB connection helper
```

---

## 🌐 Deployment

**🔗 Live Demo:** [https://personal-finance-visualizer-jet.vercel.app](https://personal-finance-visualizer-jet.vercel.app)



---

## 🛠 Setup Instructions

1. Clone this repo
2. Install dependencies
   ```bash
   npm install
   ```
3. Add your environment variables in `.env`:
   ```env
   MONGODB_URI=your_mongo_connection_string
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

