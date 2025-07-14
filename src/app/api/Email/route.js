// /app/api/email/route.js

import { NextResponse } from 'next/server';
import dbConnect from '../../lib/Email'; // Your dbConnect function
import Email from '../../models/email'; // Your Email model
import Ticket from '../../models/Ticket'; // Add this import

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
    console.log('POST /api/email');
    await dbConnect();
    
    const body = await req.json();
    console.log('Request body:', body);
    
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

    // --- Associate email with ticket ---
    let ticket;
    if (body.referenceNumber) {
      // Try to find an existing ticket by ticketId or _id
      ticket = await Ticket.findOne({ $or: [ { ticketId: body.referenceNumber }, { _id: body.referenceNumber } ] });
      if (ticket) {
        // Add email to ticket's emails array if not already present
        if (!ticket.emails) ticket.emails = [];
        if (!ticket.emails.some(eid => eid.equals(savedEmail._id))) {
          ticket.emails.push(savedEmail._id);
          await ticket.save();
        }
      }
    }
    if (!ticket) {
      // Create a new ticket if not found
      ticket = new Ticket({
        ticketId: body.referenceNumber || `TICKET-${Date.now()}`,
        customerName: body.customerName || '',
        email: body.to,
        phone: body.phone || '',
        issueType: body.type || '',
        priority: body.priority || 'Low',
        status: body.status || 'Open',
        subject: body.subject,
        description: body.description,
        fileName: body.attachments && body.attachments.length > 0 ? body.attachments[0].filename : '',
        emails: [savedEmail._id]
      });
      await ticket.save();
    }

    return NextResponse.json({
      message: 'Email created successfully',
      email: savedEmail,
      ticket
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating email:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create email', details: error.message }, 
      { status: 500 }
    );
  }
}