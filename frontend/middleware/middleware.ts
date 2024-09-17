// middleware.ts
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['pt', 'en', 'es'];

function getLocale(request) {
  const negotiator = new Negotiator({
    headers: {
      'accept-language': request.headers.get('accept-language'),
    },
  });
  const languages = negotiator.languages();
  return match(languages, locales, 'pt'); // Português como idioma padrão
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const locale = getLocale(request);

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
}
