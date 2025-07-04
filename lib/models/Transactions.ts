import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: [true, 'A transaction must have an amount!'] },
  description: { type: String, required: [true, 'A transaction must have a description'] },
  date: { type: Date, required: [true, 'A transaction must have a date'] },
  category: {
    type: String,
    enum: ["Food", "Transport", "Rent", "Shopping", "Entertainment", "Other"],
    default: "Other",
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
