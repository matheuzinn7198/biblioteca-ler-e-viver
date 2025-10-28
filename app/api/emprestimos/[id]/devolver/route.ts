import { NextRequest, NextResponse } from 'next/server';
import Emprestimo from '@/models/Emprestimo';
import Livro from '@/models/Livro';
import connectMongo from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongo();
  const emprestimo = await Emprestimo.findById(params.id).populate('livro');
  if (!emprestimo) {
    return NextResponse.json({ error: 'Empréstimo não encontrado' }, { status: 404 });
  }

  emprestimo.dataDevolucaoReal = new Date();
  emprestimo.status = 'Concluído';
  await emprestimo.save();

  const livro = emprestimo.livro as any;
  livro.status = 'Disponível';
  await livro.save();

  return NextResponse.json(emprestimo);
}