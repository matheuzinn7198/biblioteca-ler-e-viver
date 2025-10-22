import { NextRequest, NextResponse } from 'next/server';
import Livro from '@/models/Livro';
import { connectDB } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const livro = await Livro.findById(params.id);
  if (!livro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(livro);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const livro = await Livro.findByIdAndUpdate(params.id, body, { new: true });
  if (!livro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(livro);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const livro = await Livro.findByIdAndDelete(params.id);
  if (!livro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json({ success: true });
}