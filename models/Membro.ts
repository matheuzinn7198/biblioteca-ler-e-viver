import { Schema, model, models } from 'mongoose';

const membroSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: false },
}, { timestamps: true });

export default models.Membro || model('Membro', membroSchema);