import {NextResponse} from "next/server"

export function middleware(req) {
    let user = req.cookies.get('user');
    if (user) {
        user = JSON.parse(user.value);
    }
    const url = req.nextUrl.clone();
    if (url.pathname.startsWith("/dashboard")) {

        if (user) {
            return NextResponse.next();
        } else {
            url.pathname = '/'
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname.startsWith("/admin448")) {
        const url = req.nextUrl.clone()

        if (user && parseInt(user.type) === 1) {
            return NextResponse.next();
        } else if (url.pathname !== '/admin448') {
            url.pathname = '/admin448'
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/dashboard', '/admin448', '/dashboard/:path*', '/admin448/:path*'],
}