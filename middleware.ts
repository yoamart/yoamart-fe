import { NextResponse, NextRequest } from "next/server";

const protectedPaths = [
    /\/my-account(?!\/(lost-password|change-password))(.*)/, // Protect all except the specified exclusions
    /\/checkout\/(.*)/,

];

const auth = [
    "/my-account/lost-password",
    "/my-account/change-password",
];

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isProtected = protectedPaths.some((path) => path.test(request.nextUrl.pathname));
    const isAuth = auth.includes(request.nextUrl.pathname);

    if (request.nextUrl.pathname === "/my-account") {
        return NextResponse.next();
    }


    if (!token && isProtected) {
        return NextResponse.redirect(new URL("/my-account", request.url)); // Redirect if not authenticated
    }

    if (token && isAuth) {
        return NextResponse.redirect(new URL("/my-account", request.url));
    }


    return NextResponse.next(); // Allow access if conditions are met
}

export const config = {
    matcher: [
        "/my-account/:path*",
        "/checkout/:path*",],
};
