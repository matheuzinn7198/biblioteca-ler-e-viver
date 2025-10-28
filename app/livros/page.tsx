// app/livros/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Livro = {
  _id: string;
  titulo: string;
  autor: string;
  isbn: string;
  status: 'Disponível' | 'Emprestado';
};

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
  });

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    const res = await fetch('/api/livros');
    const data = await res.json();
    setLivros(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/livros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ titulo: '', autor: '', isbn: '' });
    setShowForm(false);
    fetchLivros();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      await fetch(`/api/livros/${id}`, { method: 'DELETE' });
      fetchLivros();
    }
  };

  if (loading) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/livros" className="active">Livros</Link>
        <Link href="/membros">Membros</Link>
        <Link href="/emprestimos">Empréstimos</Link>
        <Link href="/consulta">Consulta Pública</Link>
      </nav>

      <div className="header">
        <h1>📚 Livros</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Adicionar Livro'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Novo Livro</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Título</label>
              <input
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Autor</label>
              <input
                value={formData.autor}
                onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ alignSelf: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro._id}>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.isbn}</td>
                <td>
                  <span className={
                    livro.status === 'Disponível' ? 'status-disponivel' :
                    'status-emprestado'
                  }>
                    {livro.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(livro._id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}