import { dbConnect } from '../../../lib/company';
import Company from '../../../models/Company';

export async function GET(req, context) {
  await dbConnect();
  const { params } = context;
  const resolvedParams = await params;

  const company = await Company.findById(resolvedParams.id);
  if (!company) {
    return Response.json({ message: 'Company not found' }, { status: 404 });
  }

  return Response.json(company);
}

export async function PUT(req, context) {
  await dbConnect();
  const { params } = context;
  const resolvedParams = await params;
  const body = await req.json();

  const updatedCompany = await Company.findByIdAndUpdate(resolvedParams.id, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCompany) {
    return Response.json({ message: 'Company not found' }, { status: 404 });
  }

  return Response.json(updatedCompany);
}

export async function DELETE(req, context) {
  await dbConnect();
  const { params } = context;
  const resolvedParams = await params;

  const deletedCompany = await Company.findByIdAndDelete(resolvedParams.id);

  if (!deletedCompany) {
    return Response.json({ message: 'Company not found' }, { status: 404 });
  }

  return Response.json({ message: 'Company deleted successfully' });
}