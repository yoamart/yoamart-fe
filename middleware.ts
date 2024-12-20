"use server"
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
        const url = new URL("/my-account", request.url);
        url.searchParams.set("redirect", request.nextUrl.pathname); // Store the original path as 'redirect'
        return NextResponse.redirect(url);
    }

    if (token && isAuth) {
        // Check if the `redirect` query parameter is present
        const redirectUrl = request.nextUrl.searchParams.get("redirect");

        // Redirect to the specified path if `redirect` is available, otherwise go to `/my-account`
        const destination = redirectUrl ? redirectUrl : "/my-account";

        return NextResponse.redirect(new URL(destination, request.url));
    }



    return NextResponse.next(); // Allow access if conditions are met
}

export const config = {
    matcher: [
        "/my-account/:path*",
        "/checkout/:path*",],
};
