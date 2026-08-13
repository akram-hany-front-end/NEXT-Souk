"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import type { Role } from "@/lib/roles";

export default function NavbarWrapper() {
    const { data: session } = useSession();

    const role = session?.user?.role as Role | undefined;

    return <Navbar role={role} />;
}