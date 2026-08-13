
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

        const posts = await Post.find()
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


// =========================
// CREATE POST
// =========================

export async function POST(request: Request) {
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

        const body = await request.json();

        const {
            title,
            description,
            price,
            image,
        } = body;

        // Validate required fields
        if (!title || !description || price === undefined || !image) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Title, description, price and image are required.",
                },
                { status: 400 }
            );
        }

        // Find current user
        const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 }
            );
        }

        // Create post
        const post = await Post.create({
            title,
            description,
            price: Number(price),
            image,
            user: user._id,
            // status is automatically PENDING
        });

        return NextResponse.json(
            {
                success: true,
                message: "Post created successfully and is pending approval.",
                post,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CREATE POST ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create post.",
            },
            { status: 500 }
        );
    }
}

