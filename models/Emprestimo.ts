import { Schema, model, models } from 'mongoose';

const emprestimoSchema = new Schema({
  livro: { type: Schema.Types.ObjectId, ref: 'Livro', required: true },
  membro: { type: Schema.Types.ObjectId, ref: 'Membro', required: true },
  dataEmprestimo: { type: Date, default: Date.now },
  dataDevolucaoPrevista: { type: Date, required: true },
  dataDevolucaoReal: { type: Date, default: null },
  status: {
    type: String,
    enum: ['Ativo', 'Concluído', 'Atrasado'],
    default: 'Ativo',
  },
}, { timestamps: true });

export default models.Emprestimo || model('Emprestimo', emprestimoSchema);