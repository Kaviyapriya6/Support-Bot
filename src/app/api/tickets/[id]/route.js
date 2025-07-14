import { dbConnect } from '../../../lib/mongodb';
import Ticket from '../../../models/Ticket';

export async function GET(req, context) {
  await dbConnect();
  const { params } = context;
  const resolvedParams = await params;
  const ticket = await Ticket.findById(resolvedParams.id).populate('emails');
  if (!ticket) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(ticket);
}

export async function PUT(req, context) {
  await dbConnect();
  const { params } = context;
  const resolvedParams = await params;
  const data = await req.json();

  const updatedTicket = await Ticket.findByIdAndUpdate(
    resolvedParams.id,
    data,
    { new: true, runValidators: true }
  );

  if (!updatedTicket) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(updatedTicket);
}

export async function DELETE(req, context) {
  
  await dbConnect();
  const { params } = context;
  const resolvedParams = await params;
  const deleted = await Ticket.findByIdAndDelete(resolvedParams.id);
  if (!deleted) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json({ message: 'Deleted' });
}
