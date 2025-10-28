import { NextResponse } from 'next/server';
import Emprestimo from '@/models/Emprestimo';
import connectMongo from '@/lib/db';

export async function GET() {
  await connectMongo();
  const hoje = new Date();
  const atrasados = await Emprestimo.find({
    status: 'Ativo',
    dataDevolucaoPrevista: { $lt: hoje },
  })
    .populate('livro')
    .populate('membro');
  return NextResponse.json(atrasados);
}