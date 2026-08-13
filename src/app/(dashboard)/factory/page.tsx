"use client";

import Image from "next/image";
import { Search, MapPin, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

type MarketPost = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    city: string;
    sellerName: string;
    category: string;
};

const marketPosts: MarketPost[] = [
    {
        id: 1,
        title: "Premium Iron",
        description:
            "High-quality iron raw material suitable for factories and workshops.",
        price: "5,000 EGP",
        image: "/products/iron.jpg",
        city: "Cairo",
        sellerName: "Ahmed Ali",
        category: "Raw Materials",
    },
    {
        id: 2,
        title: "Steel Materials",
        description:
            "High-quality steel materials available for wholesale orders.",
        price: "8,500 EGP",
        image: "/products/steel.jpg",
        city: "Dakahlia",
        sellerName: "Mohamed Hassan",
        category: "Raw Materials",
    },
    {
        id: 3,
        title: "Copper Materials",
        description:
            "Premium copper materials with different quantities available.",
        price: "12,000 EGP",
        image: "/products/copper.jpg",
        city: "Alexandria",
        sellerName: "Omar Khaled",
        category: "Raw Materials",
    },
];

export default function MarketsPage() {
    const [search, setSearch] = useState("");

    const filteredPosts = useMemo(() => {
        return marketPosts.filter((post) => {
            const value = search.toLowerCase();

            return (
                post.title.toLowerCase().includes(value) ||
                post.description.toLowerCase().includes(value) ||
                post.city.toLowerCase().includes(value) ||
                post.category.toLowerCase().includes(value) ||
                post.sellerName.toLowerCase().includes(value)
            );
        });
    }, [search]);

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-white">shit</h1>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        Market
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Browse all available products and services.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-xl">
                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products, sellers, cities..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                        />
                    </div>
                </div>

                {/* Posts */}
                {filteredPosts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            No products found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                            >
                                {/* Image */}
                                <div className="relative h-52 w-full bg-gray-100 dark:bg-gray-800">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <h2 className="line-clamp-1 text-base font-semibold text-gray-900 dark:text-white">
                                            {post.title}
                                        </h2>

                                        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                            {post.category}
                                        </span>
                                    </div>

                                    <p className="line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        {post.description}
                                    </p>

                                    {/* Price */}
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Price
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                                            {post.price}
                                        </p>
                                    </div>

                                    {/* Seller */}
                                    <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                                        <div className="flex items-center gap-2">
                                            <UserRound
                                                size={16}
                                                className="text-gray-400"
                                            />

                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {post.sellerName}
                                            </span>
                                        </div>

                                        <div className="mt-2 flex items-center gap-2">
                                            <MapPin
                                                size={16}
                                                className="text-gray-400"
                                            />

                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {post.city}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <button
                                        type="button"
                                        className="mt-5 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}