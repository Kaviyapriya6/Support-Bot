import { dbConnect } from '../../lib/mongodb';
import Ticket from '../../models/Ticket';


export async function GET() {
  await dbConnect();
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  return Response.json(tickets);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  // assignedTo should be an array
  if (data.assignedTo && !Array.isArray(data.assignedTo)) {
    data.assignedTo = [data.assignedTo];
  }
  const ticket = await Ticket.create(data);
  return Response.json(ticket);
}
