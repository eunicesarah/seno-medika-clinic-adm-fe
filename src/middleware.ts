import type { NextRequest } from "next/server";
// import { jwtDecode , JwtPayload } from 'jwt-decode';
import { NextResponse } from "next/server";
// import Cookies from "js-cookie";

// interface MyJwtPayload extends JwtPayload {
//     email: string; // Add email property
// }

export function middleware(req: NextRequest) {
    // const token = req.cookies.get("token");
    // if (token) {
    //     try {
    //         const decoded = jwtDecode(token.value); // Fix: Pass the value of the cookie to jwtDecode
    //         console.log(decoded);
    //         return NextResponse.redirect(new URL("/", req.url))
    //     } catch (error) {
    //         console.error(error);
    //         return NextResponse.redirect(new URL("/login", req.url))
    //     }
    // }
    const isLogin = req.cookies.get("token");
    // const decoded = isLogin ? jwtDecode(isLogin.value) : null;
    // if (!isLogin) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }
}

export const config = {
    matcher: "/superadmin-:path*",
};