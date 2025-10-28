// app/membros/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Membro = {
  _id: string;
  nome: string;
  email: string;
  telefone?: string;
};

export default function MembrosPage() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    fetchMembros();
  }, []);

  const fetchMembros = async () => {
    const res = await fetch('/api/membros');
    const data = await res.json();
    setMembros(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/membros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ nome: '', email: '', telefone: '' });
    setShowForm(false);
    fetchMembros();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza?')) {
      await fetch(`/api/membros/${id}`, { method: 'DELETE' });
      fetchMembros();
    }
  };

  if (loading) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/livros">Livros</Link>
        <Link href="/membros" className="active">Membros</Link>
        <Link href="/emprestimos">Empréstimos</Link>
        <Link href="/consulta">Consulta Pública</Link>
      </nav>

      <div className="header">
        <h1>👥 Membros</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Adicionar Membro'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Novo Membro</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Nome</label>
              <input
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone (opcional)</label>
              <input
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
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
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {membros.map((membro) => (
              <tr key={membro._id}>
                <td>{membro.nome}</td>
                <td>{membro.email}</td>
                <td>{membro.telefone || '—'}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(membro._id)}
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