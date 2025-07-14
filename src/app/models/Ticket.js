import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  ticketId: String,
  customerName: String,
  email: String,
  phone: String,
  issueType: String,
  priority: String,
  status: String,
  subject: String,
  description: String,
  fileName: String,
  emails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Email' }],
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
