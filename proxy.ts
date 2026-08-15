import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get('dadup_session');

  const protectedPaths = ['/dashboard', '/compte', '/contact-app', '/cancel'];
  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  if (isProtected && !session?.value) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/login' && session?.value) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/compte/:path*', '/contact-app/:path*', '/cancel/:path*', '/login'],
};
