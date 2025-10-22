// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📚 Biblioteca Comunitária "Ler é Viver"</h1>
      <p>Bem-vindo ao sistema de gerenciamento da biblioteca!</p>
      <div>
        <Link href="/login">Entrar como Bibliotecário</Link> |&nbsp;
        <Link href="/consulta">Consultar Acervo Público</Link>
      </div>
    </div>
  );
}