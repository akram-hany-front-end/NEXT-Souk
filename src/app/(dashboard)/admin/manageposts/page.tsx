"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Clock3,
    Image as ImageIcon,
    XCircle,
    Send,
} from "lucide-react";
import Image from "next/image";

type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

type Post = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    ownerName: string;
    ownerRole: string;
    status: PostStatus;
    rejectionReason?: string;
};

const initialPosts: Post[] = [
    {
        id: 1,
        title: "Premium Iron",
        description: "High-quality iron raw material.",
        price: "5000",
        image: "",
        ownerName: "Ahmed Ali",
        ownerRole: "RMD",
        status: "PENDING",
    },
    {
        id: 2,
        title: "Fresh Vegetables",
        description: "Fresh vegetables available for wholesale.",
        price: "3000",
        image: "",
        ownerName: "Mohamed Hassan",
        ownerRole: "Wholesaler",
        status: "PENDING",
    },
    {
        id: 3,
        title: "Delivery Service",
        description: "Fast delivery service with motorcycle.",
        price: "500",
        image: "",
        ownerName: "Omar Khaled",
        ownerRole: "Shipper",
        status: "PENDING",
    },
];

const statusConfig = {
    PENDING: {
        label: "Pending",
        icon: Clock3,
        className:
            "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    },
    APPROVED: {
        label: "Approved",
        icon: CheckCircle2,
        className:
            "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400",
    },
    REJECTED: {
        label: "Rejected",
        icon: XCircle,
        className:
            "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
    },
};

export default function ManageRequestsPage() {
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const [rejectingPost, setRejectingPost] = useState<Post | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");

    const handleApprove = (id: number) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id
                    ? {
                        ...post,
                        status: "APPROVED",
                        rejectionReason: undefined,
                    }
                    : post
            )
        );
    };

    const handleOpenReject = (post: Post) => {
        setRejectingPost(post);
        setRejectionReason("");
    };

    const handleReject = () => {
        if (!rejectingPost || !rejectionReason.trim()) return;

        setPosts((prev) =>
            prev.map((post) =>
                post.id === rejectingPost.id
                    ? {
                        ...post,
                        status: "REJECTED",
                        rejectionReason: rejectionReason.trim(),
                    }
                    : post
            )
        );

        setRejectingPost(null);
        setRejectionReason("");
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        Manage Requests
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Review and manage posts submitted by users.
                    </p>
                </div>

                {/* Requests */}
                <div className="space-y-5">
                    {posts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No requests available.
                            </p>
                        </div>
                    ) : (
                        posts.map((post) => {
                            const config = statusConfig[post.status];
                            const StatusIcon = config.icon;

                            return (
                                <div
                                    key={post.id}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                                >
                                    <div className="p-5 sm:p-6">

                                        {/* Top */}
                                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                            {/* Image */}
                                            <div className="flex gap-4">
                                                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                                                    {post.image ? (
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            width={60}
                                                            height={60}
                                                            className="h-[60px] w-[60px] object-cover"
                                                        />
                                                    ) : (
                                                        <ImageIcon
                                                            size={24}
                                                            className="text-gray-400"
                                                        />
                                                    )}
                                                </div>

                                                {/* Post Info */}
                                                <div className="min-w-0">
                                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {post.title}
                                                    </h2>

                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                        {post.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div
                                                className={`flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
                                            >
                                                <StatusIcon size={14} />
                                                {config.label}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-4 dark:border-gray-800">

                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Owner
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                                                    {post.ownerName}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Role
                                                </p>

                                                <span className="mt-1 inline-flex rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                                    {post.ownerRole}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Price
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                                                    {post.price}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Request ID
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                                                    #{post.id}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rejection Reason */}
                                        {post.status === "REJECTED" &&
                                            post.rejectionReason && (
                                                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
                                                    <p className="text-xs font-semibold text-red-700 dark:text-red-400">
                                                        Rejection Reason
                                                    </p>

                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                                                        {post.rejectionReason}
                                                    </p>
                                                </div>
                                            )}

                                        {/* Actions */}
                                        {post.status === "PENDING" && (
                                            <div className="mt-6 flex flex-col gap-2 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end dark:border-gray-800">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleOpenReject(post)
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                                                >
                                                    <XCircle size={17} />
                                                    Reject
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleApprove(post.id)
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                                >
                                                    <CheckCircle2 size={17} />
                                                    Approve
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Reject Modal */}
            {rejectingPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">

                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Reject Request
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Send a reason to the post owner.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="rejectionReason"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Rejection Reason
                            </label>

                            <textarea
                                id="rejectionReason"
                                rows={5}
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(e.target.value)
                                }
                                placeholder="Write the reason for rejecting this request..."
                                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                            />
                        </div>

                        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => {
                                    setRejectingPost(null);
                                    setRejectionReason("");
                                }}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleReject}
                                disabled={!rejectionReason.trim()}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Send size={17} />
                                Send Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}