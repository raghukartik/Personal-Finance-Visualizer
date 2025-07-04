import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/lib/models/Transactions';

await connectDB();

export async function GET(){
    try{
        const transactions = await Transaction.find().sort({date: -1});
        return NextResponse.json({success: true, data: transactions});
    }catch{
        return NextResponse.json({ success: false, error: 'Failed to fetch transactions' }, { status: 500 });
    }
}

export async function POST(req: Request){
    try {
        const body = await req.json();
        const {amount, description, date, category} = body;
        if (!amount || !description || !date || !category) {
            return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
        }
        const newTransaction = await Transaction.create({amount, description, date, category});
        return NextResponse.json({ success: true, data: newTransaction });
    } catch {
        return NextResponse.json({ success: false, error: 'Failed to add transaction' }, { status: 500 });
    }
}



