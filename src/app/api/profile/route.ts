import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import { authOptions } from "@/lib/auth";
import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";

// GET /api/profile
// Get current logged-in user's profile
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findById(session.user.id).select(
            "-password"
        );

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    age: user.age,
                    nationalId: user.nationalId,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET PROFILE ERROR:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// PATCH /api/profile
// Update current logged-in user's profile
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const {
            email,
            phone,
            city,
            password,
        } = body;

        await connectDB();

        const updateData: Record<string, string> = {};

        if (email !== undefined) {
            updateData.email = email;
        }

        if (phone !== undefined) {
            updateData.phone = phone;
        }

        if (city !== undefined) {
            updateData.city = city;
        }

        if (password) {
            if (password.length < 6) {
                return NextResponse.json(
                    { message: "Password must be at least 6 characters." },
                    { status: 400 }
                );
            }

            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { $set: updateData },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Profile updated successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    age: user.age,
                    nationalId: user.nationalId,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("PATCH PROFILE ERROR:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE /api/profile
// Delete current logged-in user's account
export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const deletedUser = await User.findByIdAndDelete(
            session.user.id
        );

        if (!deletedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Account deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE PROFILE ERROR:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}