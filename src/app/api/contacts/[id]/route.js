import { dbConnect } from '../../../lib/contacts';
import Contact from '../../../models/Contact';

export async function GET(req,context) {
  await dbConnect();
const { params } = context;
 const resolvedParams = await params;
  const contact = await Contact.findById(resolvedParams.id);
  if (!contact) {
    return Response.json({ message: 'Contact not found' }, { status: 404 });
  }

  return Response.json(contact);
}

export async function PUT(req, { params }) {
  await dbConnect();

  const body = await req.json();

  const updatedContact = await Contact.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedContact) {
    return Response.json({ message: 'Contact not found' }, { status: 404 });
  }

  return Response.json(updatedContact);
}

export async function DELETE(req, { params }) {
  await dbConnect();

  const deletedContact = await Contact.findByIdAndDelete(params.id);

  if (!deletedContact) {
    return Response.json({ message: 'Contact not found' }, { status: 404 });
  }

  return Response.json({ message: 'Contact deleted successfully' });
}
