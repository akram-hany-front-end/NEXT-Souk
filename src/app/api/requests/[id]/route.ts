import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectDB } from "@/lib/mongoose";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const body = await request.json();

        const { status, rejectionReason } = body;

        // Validate status
        if (!["APPROVED", "REJECTED"].includes(status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid status.",
                },
                { status: 400 }
            );
        }

        // Rejection requires a reason
        if (status === "REJECTED" && !rejectionReason?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Rejection reason is required.",
                },
                { status: 400 }
            );
        }

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

        // Update post
        post.status = status;

        if (status === "REJECTED") {
            post.rejectionReason = rejectionReason.trim();
        } else {
            post.rejectionReason = undefined;
        }

        await post.save();

        // Get updated post with user information
        const updatedPost = await Post.findById(id)
            .populate("user", "name email role");

        return NextResponse.json(
            {
                success: true,
                message:
                    status === "APPROVED"
                        ? "Post approved successfully."
                        : "Post rejected successfully.",
                post: updatedPost,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("UPDATE REQUEST ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update request.",
            },
            { status: 500 }
        );
    }
}