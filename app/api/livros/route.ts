import { NextRequest, NextResponse } from 'next/server';
import Livro from '@/models/Livro';
import { connectDB } from '@/lib/db';

export async function GET() {
  await connectDB();
  const livros = await Livro.find().sort({ createdAt: -1 });
  return NextResponse.json(livros);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const livro = await Livro.create(body);
  return NextResponse.json(livro, { status: 201 });
}