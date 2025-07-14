import mongoose from 'mongoose';

const GroupsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Group name is required'],
    trim: true,
    maxlength: [100, 'Group name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  businessHours: {
    type: String,
    required: [true, 'Business hours are required'],
    default: 'General working hours'
  },
  activeAgents: {
    type: Number,
    default: 0,
    min: 0
  },
  agents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  }]
}, {
  timestamps: true
});

// Prevent re-compilation during development
export default mongoose.models.Groups || mongoose.model('Groups', GroupsSchema);