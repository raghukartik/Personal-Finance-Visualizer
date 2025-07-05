import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/lib/models/Transactions';

export async function PUT(req: NextRequest, ctx: unknown) {
  const context = ctx as { params: { id: string } }; 

  try {
    await connectDB();

    const id = context.params.id;
    const body = await req.json();
    const { amount, description, date, category } = body;

    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, description, date, category },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[PUT /api/transactions/[id]]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, ctx: unknown) {
  const context = ctx as { params: { id: string } };

  try {
    await connectDB();

    const { id } = context.params;
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Transaction deleted' });
  } catch (error) {
    console.error('[DELETE /api/transactions/[id]]:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete transaction' }, { status: 500 });
  }
}
