import { connectDB } from '../../../lib/agent';
import Agent from '../../../models/agent';

// GET agent by ID
export async function GET(request, context) {
  await connectDB();
  const { params } = context;
 const resolvedParams = await params;

  const agent = await Agent.findById(resolvedParams.id);

  if (!agent) {
    return Response.json({ error: 'Agent not found' }, { status: 404 });
  }

  return Response.json(agent);
}

// UPDATE agent by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const data = await request.json();

    const agent = await Agent.findByIdAndUpdate(resolvedParams.id, data, { new: true });

    if (!agent) {
      return Response.json({ error: 'Agent not found' }, { status: 404 });
    }

    return Response.json(agent);
  } catch (err) {
    console.error('Update error:', err);
    return Response.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE agent by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;

    const agent = await Agent.findByIdAndDelete(resolvedParams.id);

    if (!agent) {
      return Response.json({ error: 'Agent not found' }, { status: 404 });
    }

    return Response.json({ message: 'Agent deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    return Response.json({ error: 'Delete failed' }, { status: 500 });
  }
}
