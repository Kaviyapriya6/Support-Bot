// /app/api/company/route.js

import { NextResponse } from 'next/server';
import dbConnect from '../../lib/Company'; // Default import
import Company from '../../models/Company';

// GET handler - fetch all companies
export async function GET() {
  try {
    await dbConnect();
    const companies = await Company.find({});
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error('Error fetching companies:', error.message);
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}

// POST handler - create a new company
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