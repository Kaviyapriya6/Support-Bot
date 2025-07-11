// /models/email.js

import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    default: 'ihub (support@smsgroup-support.freshdesk.com)'
  },
  to: {
    type: String,
    required: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please enter a valid email address'
    }
  },
  cc: [{
    type: String,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please enter valid email addresses for CC'
    }
  }],
  bcc: [{
    type: String,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please enter valid email addresses for BCC'
    }
  }],
  subject: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 2000
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Open', 'Pending', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  tags: [{
    type: String,
    minLength: 2,
    maxLength: 20
  }],
  group: {
    type: String,
    enum: ['', 'Technical Support', 'Customer Service', 'Sales', 'Billing', 'General Inquiry', 'IT Support', 'Account Management']
  },
  type: {
    type: String,
    enum: ['', 'Bug Report', 'Feature Request', 'Question', 'Complaint', 'Feedback', 'Technical Issue', 'Account Issue', 'Other']
  },
  referenceNumber: String,
  attachments: [{
    filename: String,
    url: String,
    size: Number,
    type: String
  }]
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

export default mongoose.models.Email || mongoose.model('Email', EmailSchema);