"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    MapPin,
    Phone,
    ShoppingBag,
    UserRound,
} from "lucide-react";
import { useEffect, useState, use } from "react";

type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

type Post = {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    status: PostStatus;
    user: {
        name: string;
        email: string;
        phone: string;
        city: string;
        role: string;
    };
};

type ContactPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function ContactPage({ params }: ContactPageProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = use(params);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`/api/post/${id}`);

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch post."
                    );
                }

                setPost(data.post);
            } catch (error) {
                console.error("FETCH POST ERROR:", error);
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Loading post...
                </p>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Post Not Found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {error || "The post you are looking for does not exist."}
                    </p>

                    <Link
                        href="/search"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        <ArrowLeft size={17} />
                        Back to Search
                    </Link>
                </div>
            </main>
        );
    }
    const getSearchPath = (role: string) => {
        switch (role) {
            case "RETAILER":
                return "/retailer/search";

            case "RMD":
                return "/rmd/search";

            case "FACTORY":
                return "/factory/search";

            case "WHOLESALER":
                return "/wholesaler/search";

            case "SHIPPER":
                return "/shipper/search";

            case "WORKER":
                return "/worker/search";

            default:
                return "/user/search";
        }
    };
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-950">
            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <Link
                    href={getSearchPath(post.user.role)}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft size={18} />
                    Back to Search
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* POST */}
                    <section className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            {/* Image */}
                            <div className="flex h-[300px] w-full items-center justify-center bg-gray-100 dark:bg-gray-800 sm:h-[380px]">
                                {post.image ? (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={600}
                                        height={380}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <ShoppingBag
                                        size={70}
                                        className="text-gray-400"
                                    />
                                )}
                            </div>

                            {/* Post Info */}
                            <div className="p-5 sm:p-6">

                                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
                                        {post.user.role}
                                    </span>

                                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                                        {post.price}
                                    </span>
                                </div>

                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                                    {post.title}
                                </h1>

                                <div className="mt-5">
                                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Description
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SELLER */}
                    <section>
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">

                            <div className="mb-5">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Seller Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Contact the person who posted this product.
                                </p>
                            </div>

                            {/* Name */}
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <UserRound
                                        size={19}
                                        className="text-gray-600 dark:text-gray-300"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Name
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                        {post.user.name}
                                    </p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="flex items-center gap-3 border-b border-gray-100 py-4 dark:border-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <ShoppingBag
                                        size={19}
                                        className="text-gray-600 dark:text-gray-300"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Role
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                        {post.user.role}
                                    </p>
                                </div>
                            </div>

                            {/* City */}
                            <div className="flex items-center gap-3 border-b border-gray-100 py-4 dark:border-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <MapPin
                                        size={19}
                                        className="text-gray-600 dark:text-gray-300"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        City
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                        {post.user.city}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3 border-b border-gray-100 py-4 dark:border-gray-800">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <Phone
                                        size={19}
                                        className="text-gray-600 dark:text-gray-300"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Phone
                                    </p>

                                    <a
                                        href={`tel:${post.user.phone}`}
                                        className="mt-1 block truncate text-sm font-semibold text-gray-900 hover:underline dark:text-white"
                                    >
                                        {post.user.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3 py-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <Mail
                                        size={19}
                                        className="text-gray-600 dark:text-gray-300"
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Email
                                    </p>

                                    <a
                                        href={`mailto:${post.user.email}`}
                                        className="mt-1 block truncate text-sm font-semibold text-gray-900 hover:underline dark:text-white"
                                    >
                                        {post.user.email}
                                    </a>
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                <a
                                    href={`tel:${post.user.phone}`}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <Phone size={17} />
                                    Call
                                </a>

                                <a
                                    href={`mailto:${post.user.email}`}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    <Mail size={17} />
                                    Email
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

