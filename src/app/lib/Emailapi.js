import { NextResponse } from 'next/server';
import dbConnect from '../lib/Email';
import Email from '../models/email';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const email = new Email(body);
    await email.save();

    return NextResponse.json(email, { status: 201 });
  } catch (error) {
    console.error('Error creating email:', error.message);
    return NextResponse.json({ error: 'Failed to create email' }, { status: 500 });
  }
}
