// app/api/tickets/route.js
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      contactName,
      email,
      phoneNumber,
      issueType,
      priority,
      subject,
      description
    } = body;

    if (!contactName || !email || !subject || !description) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // default DB from URI
    const collection = db.collection('tickets');

    const result = await collection.insertOne({
      contactName,
      email,
      phoneNumber,
      issueType,
      priority,
      subject,
      description,
      createdAt: new Date()
    });

    return Response.json({ message: 'Ticket saved', id: result.insertedId });
  } catch (error) {
    console.error('MongoDB Error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
