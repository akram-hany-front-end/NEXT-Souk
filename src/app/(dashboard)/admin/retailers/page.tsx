"use client";

import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Search, Trash2 } from "lucide-react";

type User = {
    id: number;
    city: string;
    name: string;
    age: number;
    phone: string;
    nationalId: string;
    email: string;
};

const users: User[] = [
    {
        id: 1,
        city: "Cairo",
        name: "Ahmed Ali",
        age: 28,
        phone: "01012345678",
        nationalId: "29801011234567",
        email: "ahmed@example.com",
    },
    {
        id: 2,
        city: "Dakahlia",
        name: "Mohamed Hassan",
        age: 32,
        phone: "01123456789",
        nationalId: "29405201234567",
        email: "mohamed@example.com",
    },
    {
        id: 3,
        city: "Alexandria",
        name: "Omar Khaled",
        age: 25,
        phone: "01234567890",
        nationalId: "30106201234567",
        email: "omar@example.com",
    },
    {
        id: 4,
        city: "Giza",
        name: "Mahmoud Ahmed",
        age: 30,
        phone: "01098765432",
        nationalId: "29604151234567",
        email: "mahmoud@example.com",
    },
    {
        id: 5,
        city: "Sohag",
        name: "Hassan Ali",
        age: 27,
        phone: "01198765432",
        nationalId: "29903121234567",
        email: "hassan@example.com",
    },
    {
        id: 6,
        city: "Aswan",
        name: "Youssef Mohamed",
        age: 24,
        phone: "01298765432",
        nationalId: "30202121234567",
        email: "youssef@example.com",
    },
    {
        id: 7,
        city: "Damietta",
        name: "Mostafa Khaled",
        age: 35,
        phone: "01087654321",
        nationalId: "29107121234567",
        email: "mostafa@example.com",
    },
];

export default function AboutPage() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleDelete = (id: number) => {
        console.log("Delete user:", id);

        // API delete will be added later.
    };

    // Search
    const filteredUsers = users.filter((user) => {
        const searchValue = search.toLowerCase().trim();

        return (
            user.name.toLowerCase().includes(searchValue) ||
            user.city.toLowerCase().includes(searchValue) ||
            user.phone.includes(searchValue) ||
            user.nationalId.includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue)
        );
    });

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentUsers = filteredUsers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        About
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage registered Retailers and their information.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative w-full max-w-md">
                        <Search
                            size={19}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search users..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-white"
                        />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                                <tr>
                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Name
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        City
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Age
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Phone
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        N(ID)
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {currentUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                                    >
                                        <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {user.city}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {user.age}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {user.phone}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {user.nationalId}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {user.email}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                                title="Delete user"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 md:hidden">
                    {currentUsers.map((user) => (
                        <div
                            key={user.id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                                        {user.name}
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(user.id)}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                    title="Delete user"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        City
                                    </p>

                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.city}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Age
                                    </p>

                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.age}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Phone
                                    </p>

                                    <p className="mt-1 break-all text-sm text-gray-900 dark:text-white">
                                        {user.phone}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        N(ID)
                                    </p>

                                    <p className="mt-1 break-all text-sm text-gray-900 dark:text-white">
                                        {user.nationalId}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {currentUsers.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            No users found.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                handlePageChange(currentPage - 1)
                            }
                            disabled={currentPage === 1}
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            <ArrowBigLeft />
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => handlePageChange(page)}
                                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${currentPage === page
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                handlePageChange(currentPage + 1)
                            }
                            disabled={currentPage === totalPages}
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            <ArrowBigRight />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

