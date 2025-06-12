import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const role = req.cookies.get('role')?.value;

  // Proteggi la dashboard recruiter
  if (path.startsWith('/dashboard/recruiting')) {
    if (role !== 'recruiter') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Proteggi la dashboard manager
  if (path.startsWith('/dashboard/manager')) {
    if (role !== 'manager') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Se vuoi aggiungere altre regole, puoi continuare qui
  // ...

  // Default: lascia passare
  return NextResponse.next();
}
