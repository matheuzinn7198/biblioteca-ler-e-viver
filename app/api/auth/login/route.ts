import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

// 🔑 Credenciais fixas do bibliotecário
const ADMIN_EMAIL = 'admin@ler.com';
const ADMIN_PASSWORD_HASH = '$2a$10$X8xKvJ3qZ9W1mN2oP4rQ5eT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5m'; // senha123

export async function POST(req: NextRequest) {
  // 🔒 Verifica se as variáveis de ambiente essenciais estão definidas
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: 'JWT_SECRET não definida no .env.local' },
      { status: 500 }
    );
  }
  if (!process.env.JWT_EXPIRES_IN) {
    return NextResponse.json(
      { error: 'JWT_EXPIRES_IN não definida no .env.local' },
      { status: 500 }
    );
  }
  if (!process.env.COOKIE_NAME) {
    return NextResponse.json(
      { error: 'COOKIE_NAME não definida no .env.local' },
      { status: 500 }
    );
  }

  // 📥 Recebe os dados do corpo da requisição
  const { email, password } = await req.json();

  // ✉️ Verifica o e-mail
  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  // 🔐 Verifica a senha
  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  // 🎫 Gera o token JWT
  const token = jwt.sign({ role: 'bibliotecario' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // 🍪 Define o cookie com o token
  const response = NextResponse.json({ success: true });
  response.cookies.set(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  });

  return response;
}