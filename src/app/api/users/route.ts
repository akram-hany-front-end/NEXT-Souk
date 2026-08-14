import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const allowedRoles = ["RETAILER", "RMD" ,"WHOLESALER","WORKER","SHIPPER","FACTORY","USER"] as const;

type AllowedRole = (typeof allowedRoles)[number];

function isAllowedRole(role: string): role is AllowedRole {
    return allowedRoles.includes(role as AllowedRole);
}

export async function GET(request: Request) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized.",
                },
                { status: 401 }
            );
        }

        const currentUser = await User.findOne({
            email: session.user.email,
        });

        if (!currentUser || currentUser.role !== "ADMIN") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Forbidden.",
                },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const role = searchParams.get("role");

        if (!role || !isAllowedRole(role)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid role.",
                },
                { status: 400 }
            );
        }

        const users = await User.find(
            { role },
            { password: 0 }
        ).sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                users,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET ADMIN USERS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch users.",
            },
            { status: 500 }
        );
    }
}