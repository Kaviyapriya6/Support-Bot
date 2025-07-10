// models/Agent.js

import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    agentType: {
      type: String,
      enum: ['support', 'sales', 'admin', 'manager'],
      default: 'support',
    },
    workType: {
      type: String,
      enum: ['fulltime', 'occasional'],
      default: 'fulltime',
    },
    timezone: {
      type: String,
      default: 'GMT+05:30',
    },
    language: {
      type: String,
      enum: ['english', 'spanish', 'french', 'german', 'chinese', 'japanese'],
      default: 'english',
    },
    profileImage: {
      type: String, // base64 string or URL
    },
    signature: {
      type: String,
    },
    roles: {
      type: [String],
      default: ['Agent'],
    },
    groups: {
      type: [String],
      default: [],
    },
    ticketVisibility: {
      type: String,
      enum: ['all', 'group', 'assigned'],
      default: 'all',
    },
  },
  { timestamps: true }
);

// Ensure model is not recompiled
export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);
