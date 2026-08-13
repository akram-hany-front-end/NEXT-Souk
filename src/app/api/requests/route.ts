
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Post from "@/models/Post";
import User from "@/models/User";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";


// =========================
// GET ALL POSTS
// =========================

export async function GET() {
    try {
        await connectDB();

        const posts = await Post.find({
            status: "PENDING",
        })
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                posts,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET POSTS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch posts.",
            },
            { status: 500 }
        );
    }
}