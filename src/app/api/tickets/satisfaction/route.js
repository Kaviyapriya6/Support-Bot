import { dbConnect } from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';

export async function GET() {
  await dbConnect();
  // Example: use a 'satisfaction' field on tickets (positive/neutral/negative)
  const tickets = await Ticket.find({ satisfaction: { $exists: true } });
  const responses = tickets.length;
  const positive = tickets.filter(t => t.satisfaction === 'positive').length;
  const neutral = tickets.filter(t => t.satisfaction === 'neutral').length;
  const negative = tickets.filter(t => t.satisfaction === 'negative').length;
  const percent = n => responses ? Math.round((n / responses) * 100) : 0;
  return Response.json({
    responses,
    positive: percent(positive),
    neutral: percent(neutral),
    negative: percent(negative)
  });
}
