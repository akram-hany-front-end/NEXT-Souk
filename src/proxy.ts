import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { Roles, type Role } from "@/lib/roles";

const roleRoutes: Record<Role, string> = {
    [Roles.ADMIN]: "/admin",
    [Roles.FACTORY]: "/factory",
    [Roles.WHOLESALER]: "/wholesaler",
    [Roles.SHIPPER]: "/shipper",
    [Roles.RMD]: "/rmd",
    [Roles.RETAILER]: "/retailer",
    [Roles.WORKER]: "/worker",
    [Roles.USER]: "/user",
};

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;


    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });


    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = token.role as Role | undefined;


    if (!role || !roleRoutes[role]) {
        console.log("INVALID ROLE -> LOGIN");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const allowedRoute = roleRoutes[role];

    const isAllowed =
        pathname === allowedRoute ||
        pathname.startsWith(`${allowedRoute}/`);


    if (!isAllowed) {
        return NextResponse.redirect(new URL(allowedRoute, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/factory/:path*",
        "/wholesaler/:path*",
        "/shipper/:path*",
        "/rmd/:path*",
        "/retailer/:path*",
        "/worker/:path*",
        "/user/:path*",
    ],
};