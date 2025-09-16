import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/lib/server-locale';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const locale = formData.get('locale') as string;

  if (!locale || !locales.includes(locale as 'en' | 'ru' | 'kk')) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
  }

  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set('locale', locale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60, // 1 year
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  return response;
}
