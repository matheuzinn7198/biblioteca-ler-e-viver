// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/livros', '/membros', '/emprestimos'];
const authRoutes = ['/login'];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookieName = process.env.COOKIE_NAME;

  if (!cookieName) {
    console.error('COOKIE_NAME não definida no .env.local');
    return NextResponse.next();
  }

  const token = req.cookies.get(cookieName)?.value;

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/livros', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/livros/:path*', '/membros/:path*', '/emprestimos/:path*', '/login'],
};