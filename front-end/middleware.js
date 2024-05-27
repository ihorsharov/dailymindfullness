import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get('token');

  const protectedPaths = [
    '/Home',
    '/addMood',
    '/meditation',
    '/studying',
    '/studying/5-books',
    '/meditation-for-trainee',
    '/studying/6-advise-for-control',
    '/notes',
    '/mood_statistics',
    '/notes/addNote',
    '/signOut',
  ];

  if (!token && protectedPaths.includes(url)) {
    console.log(`Redirecting from ${url} to /login due to missing token`);
    return NextResponse.redirect(new URL('/LoginRegister', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Home',
    '/addMood',
    '/meditation',
    '/studying',
    '/studying/5-books',
    '/meditation-for-trainee',
    '/studying/6-advise-for-control',
    '/notes',
    '/mood_statistics',
    '/notes/addNote',
    '/signOut',
  ],
};

export function removeToken() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  console.log('Токен успішно видалено');
  document.location.href = '/LoginRegister';
}
