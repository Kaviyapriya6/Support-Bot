import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  company: String,
  email: { type: String, required: true },
  phone: String,
  workPhone: String,
  twitter: String,
  facebook: String,
  tags: [String],
  timezone: String,
  profileImage: String,
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
