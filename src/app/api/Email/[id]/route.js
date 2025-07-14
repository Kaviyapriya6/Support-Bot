// /app/api/email/route.js

import { NextResponse } from 'next/server';
import dbConnect from '../../lib/Email'; // Adjust path as needed
import Email from '../../models/email'; // Adjust path as needed

// GET all emails
export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const emails = await Email.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Email.countDocuments();

    return NextResponse.json({
      emails,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching emails:', error.message);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}

// POST - Create new email/support ticket
export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Validate required fields
    if (!body.to || !body.subject || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, description' }, 
        { status: 400 }
      );
    }

    // Create new email document
    const emailData = {
      from: body.from || 'ihub (support@smsgroup-support.freshdesk.com)',
      to: body.to,
      cc: body.cc || [],
      bcc: body.bcc || [],
      subject: body.subject,
      description: body.description,
      priority: body.priority || 'Low',
      status: body.status || 'Open',
      tags: body.tags || [],
      group: body.group || '',
      type: body.type || '',
      referenceNumber: body.referenceNumber || '',
      attachments: body.attachments || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newEmail = new Email(emailData);
    const savedEmail = await newEmail.save();

    console.log('Email created successfully:', savedEmail._id);

    return NextResponse.json({
      message: 'Email created successfully',
      email: savedEmail
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating email:', error.message);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create email' }, 
      { status: 500 }
    );
  }
}