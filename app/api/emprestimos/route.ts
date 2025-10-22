import { NextRequest, NextResponse } from 'next/server';
import Emprestimo from '@/models/Emprestimo';
import Livro from '@/models/Livro';
import { connectDB } from '@/lib/db';

export async function GET() {
  await connectDB();
  const emprestimos = await Emprestimo.find()
    .populate('livro')
    .populate('membro')
    .sort({ dataEmprestimo: -1 });
  return NextResponse.json(emprestimos);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { livroId, membroId, diasParaDevolucao = 7 } = await req.json();

  const livro = await Livro.findById(livroId);
  if (!livro || livro.status !== 'Disponível') {
    return NextResponse.json({ error: 'Livro indisponível' }, { status: 400 });
  }

  const dataDevolucao = new Date();
  dataDevolucao.setDate(dataDevolucao.getDate() + diasParaDevolucao);

  const emprestimo = await Emprestimo.create({
    livro: livroId,
    membro: membroId,
    dataDevolucaoPrevista: dataDevolucao,
  });

  livro.status = 'Emprestado';
  await livro.save();

  return NextResponse.json(emprestimo, { status: 201 });
}