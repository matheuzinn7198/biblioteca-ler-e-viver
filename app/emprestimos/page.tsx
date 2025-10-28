// app/emprestimos/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Livro = { _id: string; titulo: string; status: string };
type Membro = { _id: string; nome: string };
type Emprestimo = {
  _id: string;
  livro: Livro;
  membro: Membro;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  status: string;
};

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    livroId: '',
    membroId: '',
    dias: '7',
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [empRes, livRes, memRes] = await Promise.all([
      fetch('/api/emprestimos'),
      fetch('/api/livros'),
      fetch('/api/membros'),
    ]);
    const emprestimos = await empRes.json();
    const livros = (await livRes.json()).filter((l: Livro) => l.status === 'Disponível');
    const membros = await memRes.json();
    setEmprestimos(emprestimos);
    setLivros(livros);
    setMembros(membros);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/emprestimos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        livroId: formData.livroId,
        membroId: formData.membroId,
        diasParaDevolucao: parseInt(formData.dias),
      }),
    });
    setFormData({ livroId: '', membroId: '', dias: '7' });
    setShowForm(false);
    fetchAll();
  };

  const handleDevolver = async (id: string) => {
    if (confirm('Confirmar devolução?')) {
      await fetch(`/api/emprestimos/${id}/devolver`, { method: 'PUT' });
      fetchAll();
    }
  };

  if (loading) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/livros">Livros</Link>
        <Link href="/membros">Membros</Link>
        <Link href="/emprestimos" className="active">Empréstimos</Link>
        <Link href="/consulta">Consulta Pública</Link>
      </nav>

      <div className="header">
        <h1>📦 Empréstimos</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Novo Empréstimo'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Registrar Empréstimo</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Livro</label>
              <select
                value={formData.livroId}
                onChange={(e) => setFormData({ ...formData, livroId: e.target.value })}
                required
              >
                <option value="">Selecione</option>
                {livros.map((livro) => (
                  <option key={livro._id} value={livro._id}>
                    {livro.titulo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Membro</label>
              <select
                value={formData.membroId}
                onChange={(e) => setFormData({ ...formData, membroId: e.target.value })}
                required
              >
                <option value="">Selecione</option>
                {membros.map((membro) => (
                  <option key={membro._id} value={membro._id}>
                    {membro.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Dias para devolução</label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.dias}
                onChange={(e) => setFormData({ ...formData, dias: e.target.value })}
                required
              />
            </div>
            <div className="form-group" style={{ alignSelf: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">Emprestar</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Livro</th>
              <th>Membro</th>
              <th>Empréstimo</th>
              <th>Devolução Prevista</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.livro?.titulo || '—'}</td>
                <td>{emp.membro?.nome || '—'}</td>
                <td>{new Date(emp.dataEmprestimo).toLocaleDateString()}</td>
                <td>{new Date(emp.dataDevolucaoPrevista).toLocaleDateString()}</td>
                <td>
                  <span className={
                    emp.status === 'Atrasado' ? 'status-atrasado' :
                    emp.status === 'Concluído' ? 'status-disponivel' :
                    'status-emprestado'
                  }>
                    {emp.status}
                  </span>
                </td>
                <td>
                  {emp.status === 'Ativo' && (
                    <button
                      className="btn btn-outline"
                      onClick={() => handleDevolver(emp._id)}
                    >
                      Devolver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}