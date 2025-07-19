import { NextResponse } from 'next/server';

export function middleware(request) {
  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/auth/login', '/auth/signup'];
  const authRoutes = ['/auth/login', '/auth/signup'];
  
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  
  // Get the auth token from cookies or headers
  const token = request.cookies.get('authToken')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  // If user is trying to access auth pages but is already logged in
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If user is trying to access protected routes without authentication
  if (!isPublicRoute && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }
  
  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
