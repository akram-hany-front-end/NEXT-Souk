"use client";

import {
    LayoutDashboard,
    Search,
    ShoppingBag,
    CircleUserRound,
    LogOut,
    Factory,
    Users,
    Truck,
    Store,
    BriefcaseBusiness,
} from "lucide-react";
import { Roles } from "@/lib/roles";
import Image from "next/image";
import Link from "next/link";

export const adminLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Market",
        href: "/dashboard/admin/markets",
        icon: Store,
    },
    {
        title: "Search",
        href: "/dashboard/admin/search",
        icon: Search,
    },
    {
        title: "Sale",
        href: "/dashboard/admin/sale",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/dashboard/admin/profile",
        icon: CircleUserRound,
    },
];

export const factoryLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/factory",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/dashboard/factory/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/dashboard/factory/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/dashboard/factory/profile",
        icon: CircleUserRound,
    },
];

export const retailerLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/retailer",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/dashboard/retailer/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/dashboard/retailer/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/dashboard/retailer/profile",
        icon: CircleUserRound,
    },
];

export const rmdLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/rms",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/dashboard/rms/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/dashboard/rms/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/dashboard/rms/profile",
        icon: CircleUserRound,
    },
];

export const shipperLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/shipper",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/dashboard/shipper/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/dashboard/shipper/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/dashboard/shipper/profile",
        icon: CircleUserRound,
    },
];

export const userLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/user",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/dashboard/user/search",
        icon: Search,
    },
    {
        title: "Profile",
        href: "/dashboard/user/profile",
        icon: CircleUserRound,
    },
];

export const wholesalerLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/wholesaler",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/dashboard/wholesaler/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/dashboard/wholesaler/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/dashboard/wholesaler/profile",
        icon: CircleUserRound,
    },
];

export const workerLinks = [
    {
        title: "Dashboard",
        href: "/dashboard/worker",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/dashboard/worker/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/dashboard/worker/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/dashboard/worker/profile",
        icon: CircleUserRound,
    },
];

type NavbarProps = {
    role?: string;
};

const Navbar = ({ role }: NavbarProps) => {
    const handleLogout = async () => {
        // await signOut({
        //   callbackUrl: "/sign-in",
        // });
    };

    const menuItems =
        role === Roles.ADMIN
            ? adminLinks
            : role === Roles.FACTORY
                ? factoryLinks
                : role === Roles.RETAILER
                    ? retailerLinks
                    : role === Roles.RMD
                        ? rmdLinks
                        : role === Roles.SHIPPER
                            ? shipperLinks
                            : role === Roles.WHOLESALER
                                ? wholesalerLinks
                                : role === Roles.WORKER
                                    ? workerLinks
                                    : userLinks;

    return (
        <nav className="w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4">
                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Souq Logo"
                        width={40}
                        height={40}
                    />

                    <span className="hidden text-xl font-bold text-gray-900 sm:block dark:text-white">
                        Souq
                    </span>
                </Link>

                {/* Navigation */}
                <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <Icon size={18} />

                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    type="button"
                    className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                >
                    <LogOut size={18} />

                    <span className="hidden sm:block">Sign Out</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;