import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const role = req.cookies.get('role')?.value;
  const allowedRecruiter = ['/dashboard/recruiting'];
  if (allowedRecruiter.some(p => path.startsWith(p)) && role !== 'recruiter') {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
