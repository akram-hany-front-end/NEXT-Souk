import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 }
            );
        }

        // Prevent admin from deleting another admin
        if (user.role === "ADMIN") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin users cannot be deleted.",
                },
                { status: 403 }
            );
        }

        await User.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message: "User deleted successfully.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE ADMIN USER ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete user.",
            },
            { status: 500 }
        );
    }
}