import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/lib/models/Transactions';

// ✅ Correct function signature with context
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  try {
    const { id } = context.params;
    const body = await req.json();
    const { amount, description, date, category } = body;

    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, description, date, category },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update transaction' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  try {
    const { id } = context.params;

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Transaction deleted' });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete transaction' }, { status: 500 });
  }
}
