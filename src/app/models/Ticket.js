import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  ticketId: String,
  customerId: String,
  email: String,
  phone: String,
  issueType: String,
  priority: String,
  status: String,
  subject: String,
  description: String,
  fileName: String,
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
