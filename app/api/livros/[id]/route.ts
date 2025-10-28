import { NextRequest, NextResponse } from 'next/server';
import Livro from '@/models/Livro';
import connectMongo from '@/lib/db';
import { Types } from 'mongoose';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongo();
  const livro = await Livro.findById(params.id);
  if (!livro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(livro);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongo();
  const body = await req.json();
  const livro = await Livro.findByIdAndUpdate(params.id, body, { new: true });
  if (!livro) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  return NextResponse.json(livro);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ← Promise aqui!
) {
  await connectMongo();

  // ✅ Agora você DEVE fazer isso:
  const { id } = await params; // ← await params

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const livro = await Livro.findByIdAndDelete(id);

  if (!livro) {
    return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}