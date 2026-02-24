import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value;
    console.log("token:", token)

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/activity',
}