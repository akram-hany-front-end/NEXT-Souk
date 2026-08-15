import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            name,
            email,
            password,
            phone,
            city,
            age,
            nationalId,
                role,
        } = body;

        // Validation
        if (
            !name ||
            !email ||
            !password ||
            !phone ||
            !city ||
            !age ||
            !role ||
            !nationalId
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { nationalId },
            ],
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email or National ID already exists",
                },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            phone: phone.trim(),
            city: city.trim(),
            age: Number(age),
            nationalId: nationalId.trim(),
            role: role,
        });

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
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
            { status: 201 }
        );
   } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
        {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
        },
        { status: 500 }
    );
}
}