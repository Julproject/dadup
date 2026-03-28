import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Routes protégées
  const protectedPaths = ['/dashboard'];
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (isProtected) {
    const session = req.cookies.get('dadup_session');
    if (!session?.value) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si déjà connecté et tente d'aller sur /login → rediriger vers /dashboard
  if (pathname === '/login') {
    const session = req.cookies.get('dadup_session');
    if (session?.value) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
