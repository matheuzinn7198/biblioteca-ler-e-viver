import { NextRequest, NextResponse } from 'next/server';
import Membro from '@/models/Membro';
import connectMongo from '@/lib/db';

export async function GET() {
  await connectMongo();
  const membros = await Membro.find().sort({ createdAt: -1 });
  return NextResponse.json(membros);
}

export async function POST(req: NextRequest) {
  await connectMongo();
  const body = await req.json();
  const membro = await Membro.create(body);
  return NextResponse.json(membro, { status: 201 });
}