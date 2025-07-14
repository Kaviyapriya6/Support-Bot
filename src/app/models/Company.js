import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  notes: String,
  domain: String,
  healthScore: String,
  accountTier: String,
  renewalDate: Date,
  industry: String,
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
