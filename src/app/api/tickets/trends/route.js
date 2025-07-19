import { dbConnect } from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';

export async function GET() {
  await dbConnect();
  // Example: group by hour of createdAt for today
  const start = new Date();
  start.setHours(0,0,0,0);
  const end = new Date();
  end.setHours(23,59,59,999);
  const pipeline = [
    { $match: { createdAt: { $gte: start, $lte: end } } },
    { $group: {
      _id: { $hour: '$createdAt' },
      value: { $sum: 1 }
    }},
    { $sort: { '_id': 1 } }
  ];
  const result = await Ticket.aggregate(pipeline);
  // Fill missing hours
  const data = Array.from({length: 24}, (_, hour) => {
    const found = result.find(r => r._id === hour);
    return { hour: hour.toString(), value: found ? found.value : 0 };
  });
  return Response.json(data);
}
