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

type Post = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    role: string;
    seller: {
        name: string;
        email: string;
        phone: string;
        city: string;
    };
};

const posts: Post[] = [
    {
        id: 1,
        title: "Premium Iron",
        description:
            "High-quality iron raw material suitable for factories and industrial use.",
        price: "5000",
        image: "",
        role: "Factory",
        seller: {
            name: "Ahmed Ali",
            email: "ahmed@example.com",
            phone: "01012345678",
            city: "Cairo",
        },
    },
    {
        id: 2,
        title: "Steel Materials",
        description:
            "High-quality steel materials available for wholesale and industrial use.",
        price: "8500",
        image: "",
        role: "Wholesaler",
        seller: {
            name: "Mohamed Hassan",
            email: "mohamed@example.com",
            phone: "01123456789",
            city: "Dakahlia",
        },
    },
];

type ContactPageProps = {
    params: {
        id: string;
    };
};

export default function ContactPage({ params }: ContactPageProps) {
    const post = posts.find((item) => item.id === Number(params.id));

    if (!post) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Post Not Found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        The post you are looking for does not exist.
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

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-950">
            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <Link
                    href="/search"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft size={18} />
                    Back to Search
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* ================= POST ================= */}
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
                                        {post.role}
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

                    {/* ================= SELLER ================= */}
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
                                        {post.seller.name}
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
                                        {post.role}
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
                                        {post.seller.city}
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
                                        href={`tel:${post.seller.phone}`}
                                        className="mt-1 block truncate text-sm font-semibold text-gray-900 hover:underline dark:text-white"
                                    >
                                        {post.seller.phone}
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
                                        href={`mailto:${post.seller.email}`}
                                        className="mt-1 block truncate text-sm font-semibold text-gray-900 hover:underline dark:text-white"
                                    >
                                        {post.seller.email}
                                    </a>
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                <a
                                    href={`tel:${post.seller.phone}`}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <Phone size={17} />
                                    Call
                                </a>

                                <a
                                    href={`mailto:${post.seller.email}`}
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