import { connectDB } from '@/lib/db';
import Livro from '@/models/Livro';

export default async function ConsultaPage() {
  await connectDB();
  const livros = await Livro.find({ status: 'Disponível' });

  return (
    <div className="container">
      <h1>📚 Acervo Disponível</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro._id.toString()}>
            <strong>{livro.titulo}</strong> – {livro.autor} (ISBN: {livro.isbn})
          </li>
        ))}
      </ul>
    </div>
  );
}