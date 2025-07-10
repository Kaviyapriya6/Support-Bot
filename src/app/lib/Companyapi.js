import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Company from '@/models/Company';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const company = new Company(body);
    await company.save();

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error.message);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}
