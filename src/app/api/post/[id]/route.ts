import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Post from "@/models/Post";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";


// =========================
// PATCH POST
// =========================

export async function PATCH(
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

        const { id } = await params;

        const body = await request.json();

        const {
            title,
            description,
            price,
            image,
        } = body;

        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Post not found.",
                },
                { status: 404 }
            );
        }

        // Update only the fields that were sent
        if (title !== undefined) {
            post.title = title;
        }

        if (description !== undefined) {
            post.description = description;
        }

        if (price !== undefined) {
            post.price = Number(price);
        }

        if (image !== undefined) {
            post.image = image;
        }

        await post.save();

        return NextResponse.json(
            {
                success: true,
                message: "Post updated successfully.",
                post,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("PATCH POST ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update post.",
            },
            { status: 500 }
        );
    }
}


// =========================
// DELETE POST
// =========================

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

        const { id } = await params;

        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Post not found.",
                },
                { status: 404 }
            );
        }

        await Post.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message: "Post deleted successfully.",
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("DELETE POST ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete post.",
            },
            { status: 500 }
        );
    }
}

