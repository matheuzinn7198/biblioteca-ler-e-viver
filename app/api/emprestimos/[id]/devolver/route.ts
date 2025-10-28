import { NextRequest, NextResponse } from 'next/server';
import Emprestimo from '@/models/Emprestimo';
import Livro from '@/models/Livro';
import connectMongo from '@/lib/db';
import { Types } from 'mongoose';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectMongo();
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const emprestimo = await Emprestimo.findById(id).populate('livro');
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