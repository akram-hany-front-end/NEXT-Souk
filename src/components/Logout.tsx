"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Logout() {
    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <button
            onClick={handleLogout}
            className="flex cursor-pointer h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-red-50 hover:text-red-600 sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2 dark:text-gray-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
        >
            <LogOut size={18} />
            <span className="hidden sm:block text-sm font-medium">
                Sign Out
            </span>
        </button>
    );
}