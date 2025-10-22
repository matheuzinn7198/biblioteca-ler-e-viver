import { Schema, model, models } from 'mongoose';

const livroSchema = new Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['Disponível', 'Emprestado'],
    default: 'Disponível',
  },
}, { timestamps: true });

export default models.Livro || model('Livro', livroSchema);