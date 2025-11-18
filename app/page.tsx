// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#0f172a' }}>
        📚 Biblioteca Comunitária {"Ler é Viver"}
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#475569' }}>
        Sistema de gerenciamento de livros e empréstimos
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link href="/login" className="btn btn-primary">
          Entrar como Bibliotecário
        </Link>
        <Link href="/consulta" className="btn btn-outline">
          Consultar Acervo Público
        </Link>
      </div>
    </div>
  );
}