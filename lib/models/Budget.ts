import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Food", "Transport", "Rent", "Shopping", "Entertainment", "Other"],
    required: true,
  },
  month: {
    type: String, // Format: YYYY-MM
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

BudgetSchema.index({ category: 1, month: 1 }, { unique: true }); 

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
