"use client";
import Image from "next/image";
import { ImageIcon, Phone, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
type PostStatus = "PENDING" | "APPROVED" | "REJECTED";
type Post = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    role: string;
    status: PostStatus;
};
const roleOptions = [
    "All",
    "Factory",
    "Worker",
    "Wholesaler",
    "Shipper",
    "RMD",
    "Retailer",
];
export default function SearchForPage() {
    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);

    const filteredPosts = posts
        .filter((post) => post.status === "APPROVED")
        .filter((post) => {
            const searchValue = search.toLowerCase().trim();
            const matchesSearch =
                post.title.toLowerCase().includes(searchValue) ||
                post.description.toLowerCase().includes(searchValue);
            const matchesRole =
                selectedRole === "All" ||
                post.role === selectedRole;
            return matchesSearch && matchesRole;
        });
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(
                    "/api/post?role"
                );
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch rmds."
                    );
                }
                setPosts(data.post || []);
            } catch (error) {
                console.error("FETCH RETAILERS ERROR:", error);
                setError("Failed to load rmds.");
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        Search For
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Search and filter available products and services.
                    </p>
                </div>
                {/* Search & Filter */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for a product or service..."
                            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                        />
                    </div>
                    {/* Role Filter */}
                    <div className="w-full sm:w-52">
                        <select
                            value={selectedRole}
                            onChange={(e) =>
                                setSelectedRole(e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-white"
                        >
                            {roleOptions.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Results Count */}
                <div className="mb-5">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {filteredPosts.length}{" "}
                        {filteredPosts.length === 1
                            ? "result"
                            : "results"}{" "}
                        found
                    </p>
                </div>
                {/* Results */}
                {filteredPosts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            No products or services found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                            >
                                {/* Image */}
                                <div className="flex h-52 w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width={400}
                                            height={300}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon
                                            size={45}
                                            className="text-gray-400"
                                        />
                                    )}
                                </div>
                                {/* Content */}
                                <div className="p-5">
                                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                        {post.role}
                                    </span>
                                    <h2 className="mt-3 truncate text-lg font-semibold text-gray-900 dark:text-white">
                                        {post.title}
                                    </h2>
                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                        {post.description}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Price
                                            </p>
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                {post.price}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                        >
                                            <Link
                                                href={`/contact/${post.id}`}
                                                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                            >
                                                <Phone size={16} />
                                                Contact
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}