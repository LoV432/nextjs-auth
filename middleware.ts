// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { ironOptions } from '@/lib/iron-config';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const session = await getIronSession(req, res, ironOptions);
	const { user } = session;
	if (user === undefined && req.nextUrl.pathname !== '/login') {
		return NextResponse.redirect(new URL('/login', req.url));
	}
	if (user !== undefined && req.nextUrl.pathname === '/login') {
		return NextResponse.redirect(new URL('/profile', req.url));
	}
}

export const config = {
	matcher: ['/profile', '/login']
};
