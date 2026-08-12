"use client";

import { FormEvent, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    Pencil,
    Plus,
    Trash2,
    XCircle,
} from "lucide-react";
import Image from "next/image";

type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

type Post = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
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
        status: "PENDING",
    },
    {
        id: 2,
        title: "Steel Materials",
        description: "High-quality steel materials for factories.",
        price: "8500",
        image: "",
        status: "REJECTED",
        rejectionReason:
            "Please provide more information about the product.",
    },
    {
        id: 3,
        title: "Copper Materials",
        description: "Premium copper materials.",
        price: "12000",
        image: "",
        status: "APPROVED",
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

export default function SellPage() {
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const handleCreatePost = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !price.trim()) {
            return;
        }

        const newPost: Post = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            price: price.trim(),
            image: image.trim(),
            status: "PENDING",
        };

        setPosts((prev) => [newPost, ...prev]);

        setTitle("");
        setDescription("");
        setPrice("");
        setImage("");
    };

    const handleDelete = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    const handleEdit = (post: Post) => {
        setEditingPost({ ...post });
    };

    const handleUpdatePost = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingPost) return;

        setPosts((prev) =>
            prev.map((post) =>
                post.id === editingPost.id
                    ? {
                        ...editingPost,
                        status:
                            post.status === "REJECTED"
                                ? "PENDING"
                                : post.status,
                        rejectionReason:
                            post.status === "REJECTED"
                                ? undefined
                                : post.rejectionReason,
                    }
                    : post
            )
        );

        setEditingPost(null);
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        Sell
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Create and manage your products and sales requests.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                    {/* ================= REQUEST STATUS ================= */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Request Status
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Track the status of your submitted posts.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {posts.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        No posts yet.
                                    </p>
                                </div>
                            ) : (
                                posts.map((post) => {
                                    const config =
                                        statusConfig[post.status];

                                    const StatusIcon = config.icon;

                                    return (
                                        <div
                                            key={post.id}
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                                        >
                                            {/* Post Header */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                                                        {post.title}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                        {post.description}
                                                    </p>
                                                </div>

                                                <div
                                                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
                                                >
                                                    <StatusIcon size={14} />

                                                    {config.label}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-4">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Price
                                                </span>

                                                <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                                                    {post.price}
                                                </p>
                                            </div>

                                            {/* Rejection Reason */}
                                            {post.status === "REJECTED" &&
                                                post.rejectionReason && (
                                                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/20">
                                                        <p className="text-xs font-semibold text-red-700 dark:text-red-400">
                                                            Rejection Reason
                                                        </p>

                                                        <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                                                            {
                                                                post.rejectionReason
                                                            }
                                                        </p>
                                                    </div>
                                                )}

                                            {/* Actions */}
                                            {(post.status === "PENDING" ||
                                                post.status === "REJECTED") && (
                                                    <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(post)
                                                            }
                                                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                                        >
                                                            <Pencil size={16} />
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    post.id
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                                        >
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </section>

                    {/* ================= CREATE POST ================= */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Create Post
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Create a new product or service request.
                            </p>
                        </div>

                        <form
                            onSubmit={handleCreatePost}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900"
                        >
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Title
                                </label>

                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    placeholder="Enter product title"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                />
                            </div>

                            {/* Description */}
                            <div className="mt-5">
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    rows={5}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Describe your product or service"
                                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                />
                            </div>

                            {/* Price */}
                            <div className="mt-5">
                                <label
                                    htmlFor="price"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Price
                                </label>

                                <input
                                    id="price"
                                    type="text"
                                    inputMode="decimal"
                                    value={price}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9.]/g, "");

                                        setPrice(value);
                                    }}
                                    placeholder="Enter price"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="mt-5">
                                <label
                                    htmlFor="image"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Product Image
                                </label>

                                <div className="flex items-center gap-4">
                                    <label
                                        htmlFor="image"
                                        className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Choose Image

                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (!file) return;

                                                const imageUrl = URL.createObjectURL(file);

                                                setImage(imageUrl);
                                            }}
                                        />
                                    </label>

                                    {image && (
                                        <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                            <Image
                                                src={image}
                                                alt="Product preview"
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Status Info */}
                            <div className="mt-5 rounded-xl bg-yellow-50 p-4 dark:bg-yellow-950/20">
                                <div className="flex items-start gap-3">
                                    <Clock3
                                        size={18}
                                        className="mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                                            Review Required
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-yellow-700 dark:text-yellow-400">
                                            Your post will be submitted as
                                            Pending and must be reviewed by
                                            the admin before it becomes
                                            visible.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                <Plus size={18} />
                                Create Post
                            </button>
                        </form>
                    </section>
                </div>
            </div>

            {/* ================= EDIT MODAL ================= */}
            {editingPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Edit Post
                                </h2>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Update your post information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setEditingPost(null)}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdatePost}>
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="edit-title"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Title
                                </label>

                                <input
                                    id="edit-title"
                                    type="text"
                                    value={editingPost.title}
                                    onChange={(e) =>
                                        setEditingPost({
                                            ...editingPost,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-black dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>

                            {/* Description */}
                            <div className="mt-5">
                                <label
                                    htmlFor="edit-description"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="edit-description"
                                    rows={5}
                                    value={editingPost.description}
                                    onChange={(e) =>
                                        setEditingPost({
                                            ...editingPost,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-black dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>

                            {/* Price */}
                            <div className="mt-5">
                                <label
                                    htmlFor="edit-price"
                                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Price
                                </label>

                                <input
                                    id="edit-price"
                                    type="number"
                                    min="0"
                                    value={editingPost.price}
                                    onChange={(e) =>
                                        setEditingPost({
                                            ...editingPost,
                                            price: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-black dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingPost(null)}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

