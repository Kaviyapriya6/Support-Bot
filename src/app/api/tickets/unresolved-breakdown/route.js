import { dbConnect } from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';

export async function GET() {
  await dbConnect();
  // Example: group by issueType for unresolved tickets
  const unresolved = await Ticket.aggregate([
    { $match: { status: { $nin: ['Resolved', 'Closed'] } } },
    { $group: {
      _id: '$issueType',
      count: { $sum: 1 }
    }},
    { $sort: { count: -1 } }
  ]);
  // Assign a color for each group (fallback to blue)
  const colorMap = {
    'Customer support': '#1976d2',
    'Loyalty programs': '#388e3c',
    'Vendor management': '#f57c00',
    'Billing': '#d32f2f'
  };
  const data = unresolved.map(g => ({
    name: g._id || 'Other',
    count: g.count,
    color: colorMap[g._id] || '#1976d2'
  }));
  return Response.json(data);
}
