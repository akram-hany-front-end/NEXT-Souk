import type { Metadata } from "next";
import "../globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Providers from "@/components/Providers";
export const metadata: Metadata = {
  title: "Connected",
  description: "Connected Platform",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <NavbarWrapper />
        <main>{children}</main>
      </div>
    </Providers>
  );
}