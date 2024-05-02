import type { NextRequest } from "next/server";
// import { jwtDecode , JwtPayload } from 'jwt-decode';
import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    email: string;
    exp: number;
    nama: string;
    role: string;
    user_id: number;
    user_uuid: string;
}
// interface MyJwtPayload extends JwtPayload {
//     email: string; // Add email property
// }

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    // const token = Cookies.get('token');
    // if (token) {
    //     try {
    //         const decoded: JwtPayload = jwtDecode(token.value);
    //         const role = decoded.role;
    //         switch (role) {
    //             case 'dokter':
    //                 if (!req.nextUrl.pathname.startsWith("/dokter")) {
    //                     return NextResponse.redirect(new URL("/dokter", req.url));
    //                 }
    //                 break;
    //             case 'apoteker':
    //                 if (!req.nextUrl.pathname.startsWith("/apoteker")) {
    //                     return NextResponse.redirect(new URL("/apoteker/dashboard", req.url));
    //                 }
    //                 break;
    //             case 'perawat':
    //                 //TODO: add pathname ners-ttv
    //                 if (!req.nextUrl.pathname.startsWith("/nurse-dashboard")) {
    //                     return NextResponse.redirect(new URL("/nurse-dashboard", req.url));
    //                 }
    //                 break;
    //             case 'front officer':
    //                 if (!req.nextUrl.pathname.startsWith("/frontoffice")) {
    //                     return NextResponse.redirect(new URL("/frontoffice/dashboard", req.url));
    //                 }
    //                 break;
    //             case 'kasir':
    //                 if (!req.nextUrl.pathname.startsWith("/kasir")) {
    //                     return NextResponse.redirect(new URL("/kasir/dashboard", req.url));
    //                 }
    //                 break;
    //             case 'super admin':
    //                 if (!req.nextUrl.pathname.startsWith("/superadmin")) {
    //                     return NextResponse.redirect(new URL("/superadmin/dashboard", req.url));
    //                 }
    //                 break;
    //             default:
    //                 location.href = '/';
    //                 break;
            
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return NextResponse.redirect(new URL("/login", req.url))
    //     }
    // }else{
    //     return NextResponse.redirect(new URL("/login", req.url))
    // }

    // const isLogin = req.cookies.get("token");
    // // const decoded = isLogin ? jwtDecode(isLogin.value) : null;
    // if (!isLogin) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
};