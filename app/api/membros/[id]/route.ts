import { NextRequest, NextResponse } from 'next/server';
import Membro from '@/models/Membro';
import connectMongo from '@/lib/db';
import { Types } from 'mongoose';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongo();
  const membro = await Membro.findById(params.id);
  if (!membro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(membro);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongo();
  const body = await req.json();
  const membro = await Membro.findByIdAndUpdate(params.id, body, { new: true });
  if (!membro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(membro);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectMongo();
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const membro = await Membro.findByIdAndDelete(id);
  if (!membro) {
    return NextResponse.json({ error: 'Membro não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}