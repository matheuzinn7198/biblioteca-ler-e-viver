import { NextRequest, NextResponse } from 'next/server';
import Membro from '@/models/Membro';
import { connectDB } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const membro = await Membro.findById(params.id);
  if (!membro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(membro);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const membro = await Membro.findByIdAndUpdate(params.id, body, { new: true });
  if (!membro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(membro);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const membro = await Membro.findByIdAndDelete(params.id);
  if (!membro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json({ success: true });
}