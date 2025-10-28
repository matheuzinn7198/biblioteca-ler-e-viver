// app/consulta/page.tsx
import connectMongo from '@/lib/db';
import Livro from '@/models/Livro';

export default async function ConsultaPage() {
  await connectMongo();
  const livros = await Livro.find({ status: 'Disponível' });

  return (
    <div className="container">
      <div className="header">
        <h1>📚 Acervo Disponível</h1>
      </div>

      <div className="card">
        {livros.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>
            Nenhum livro disponível no momento.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>ISBN</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <tr key={livro._id.toString()}>
                  <td>{livro.titulo}</td>
                  <td>{livro.autor}</td>
                  <td>{livro.isbn}</td>
                  <td>
                    <span className="status-disponivel">Disponível</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/" className="btn btn-outline">
          ← Voltar à Página Inicial
        </a>
      </div>
    </div>
  );
}