import { dbConnect } from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';

export async function GET(req, { params }) {
  await dbConnect();
  const ticket = await Ticket.findById(params.id);
  if (!ticket) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(ticket);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();

  const updatedTicket = await Ticket.findByIdAndUpdate(
    params.id,
    data,
    { new: true, runValidators: true }
  );

  if (!updatedTicket) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(updatedTicket);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const deleted = await Ticket.findByIdAndDelete(params.id);
  if (!deleted) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json({ message: 'Deleted' });
}
