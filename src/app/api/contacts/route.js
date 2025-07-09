import { dbConnect } from '../../lib/contacts';
import Contact from '../../models/Contact';

export async function GET() {
  await dbConnect();
  const contacts = await Contact.find();
  return Response.json(contacts);
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const newContact = await Contact.create(data);
  return Response.json(newContact, { status: 201 });
}
