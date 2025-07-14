import { connectDB } from '../../lib/agent';
import Agent from '../../models/agent';

export async function GET() {
  await connectDB();
  const agents = await Agent.find();
  return Response.json(agents);
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body) 
    const agent = await Agent.create(body);
    return Response.json(agent, { status: 201 });
  } catch (err) {
    console.error('Create agent error:', err);
    return Response.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
