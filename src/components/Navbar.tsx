"use client";

import { useRef } from "react";
import {
    LayoutDashboard,
    ChevronRight,
    ChevronLeft,
    Search,
    ShoppingBag,
    CircleUserRound,
    Factory,
    Users,
    Truck,
    UserRound,
    Store,
    BriefcaseBusiness,
    Mail,
    Building2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import { Roles, type Role } from "@/lib/roles";

export const adminLinks = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Manage requests",
        href: "/admin/manageposts",
        icon: Mail,
    },
    {
        title: "Factory owners",
        href: "/admin/factoryowners",
        icon: Factory,
    },
    {
        title: "Retailers",
        href: "/admin/retailers",
        icon: Users,
    },
    {
        title: "RMDs",
        href: "/admin/rmds",
        icon: Building2,
    },
    {
        title: "Shippers",
        href: "/admin/shippers",
        icon: Truck,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: UserRound,
    },
    {
        title: "Wholesalers",
        href: "/admin/wholesalers",
        icon: Store,
    },
    {
        title: "Workers",
        href: "/admin/workers",
        icon: BriefcaseBusiness,
    },
    {
        title: "Profile",
        href: "/admin/profile",
        icon: CircleUserRound,
    },
];

export const factoryLinks = [
    {
        title: "Dashboard",
        href: "/factory",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/factory/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/factory/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/factory/profile",
        icon: CircleUserRound,
    },
];

export const retailerLinks = [
    {
        title: "Dashboard",
        href: "/retailer",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/retailer/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/retailer/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/retailer/profile",
        icon: CircleUserRound,
    },
];

export const rmdLinks = [
    {
        title: "Dashboard",
        href: "/rmd",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/rmd/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/rmd/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/rmd/profile",
        icon: CircleUserRound,
    },
];

export const shipperLinks = [
    {
        title: "Dashboard",
        href: "/shipper",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/shipper/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/shipper/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/shipper/profile",
        icon: CircleUserRound,
    },
];

export const userLinks = [
    {
        title: "Dashboard",
        href: "/user",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/user/search",
        icon: Search,
    },
    {
        title: "Profile",
        href: "/user/profile",
        icon: CircleUserRound,
    },
];

export const wholesalerLinks = [
    {
        title: "Dashboard",
        href: "/wholesaler",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/wholesaler/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/wholesaler/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/wholesaler/profile",
        icon: CircleUserRound,
    },
];

export const workerLinks = [
    {
        title: "Dashboard",
        href: "/worker",
        icon: LayoutDashboard,
    },
    {
        title: "Search",
        href: "/worker/search",
        icon: Search,
    },
    {
        title: "Sell",
        href: "/worker/sell",
        icon: ShoppingBag,
    },
    {
        title: "Profile",
        href: "/worker/profile",
        icon: CircleUserRound,
    },
];

const roleLinks: Record<Role, typeof adminLinks> = {
    [Roles.ADMIN]: adminLinks,
    [Roles.FACTORY]: factoryLinks,
    [Roles.RETAILER]: retailerLinks,
    [Roles.RMD]: rmdLinks,
    [Roles.SHIPPER]: shipperLinks,
    [Roles.WHOLESALER]: wholesalerLinks,
    [Roles.WORKER]: workerLinks,
    [Roles.USER]: userLinks,
};
type NavbarProps = {
    role?: Role;
};

const Navbar = ({ role }: NavbarProps) => {
    const navRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        navRef.current?.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        navRef.current?.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };


const menuItems = role
    ? roleLinks[role]
    : [];

    return (
        <nav className="w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-2 px-2 sm:gap-4 sm:px-4">

                {/* Logo */}
                <Link
                    href=""
                    className="flex shrink-0 items-center gap-2 sm:gap-3"
                >
                    <Image
                        src="/logo.png"
                        alt="Souq Logo"
                        width={40}
                        height={40}
                        className="rounded-full bg-transparent"
                    />

                
                </Link>

                {/* Navigation */}
                <div className="flex min-w-0 flex-1 items-center gap-1">

                    {/* Left Arrow */}
                    <button
                        type="button"
                        onClick={scrollLeft}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:h-9 sm:w-9 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Navigation Items */}
                    <div className="min-w-0 flex-1 overflow-hidden">
                        <div
                            ref={navRef}
                            className={`flex gap-1 overflow-x-auto scroll-smooth scrollbar-hide sm:gap-2 ${menuItems.length <= 4
                                    ? "justify-center"
                                    : "justify-start"
                                }`}                   >
                            {menuItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="flex h-9 min-w-[90px] shrink-0 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:min-w-[104px] sm:gap-2 sm:px-3 sm:text-sm dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                    >
                                        <Icon size={17} />

                                        <span className="truncate">
                                            {item.title}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        type="button"
                        onClick={scrollRight}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:h-9 sm:w-9 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Logout button*/}
                <Logout />
            </div>
        </nav>
    );
};

export default Navbar;

