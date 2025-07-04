import { NextResponse } from "next/server";
import { connectDB } from '@/lib/mongodb';
import Budget from "@/lib/models/Budget";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { category, month, amount } = body;

    const budget = await Budget.findOneAndUpdate(
      { category, month },
      { amount },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: budget });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find({});
    return NextResponse.json({ success: true, data: budgets });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
