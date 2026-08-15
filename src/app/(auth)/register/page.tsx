"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Role, Roles } from "@/lib/roles";
import { useRouter } from "next/navigation";
type RegisterForm = {
    city: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    age: string;
    nationalId: string;
    role: Role | "";
};
const governorates = [
    "Cairo",
    "Alexandria",
    "Port Said",
    "Suez",
    "Damietta",
    "Dakahlia",
    "Sharqia",
    "Qalyubia",
    "Kafr El Sheikh",
    "Gharbia",
    "Monufia",
    "Beheira",
    "Ismailia",
    "Giza",
    "Beni Suef",
    "Fayoum",
    "Minya",
    "Assiut",
    "Sohag",
    "Qena",
    "Luxor",
    "Aswan",
    "Red Sea",
    "New Valley",
    "Matrouh",
    "North Sinai",
    "South Sinai",
];

const roleOptions = Object.values(Roles).filter((role) => role!== "ADMIN" );

export default function Page() {
        const router = useRouter();
    const [form, setForm] = useState<RegisterForm>({
        city: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        age: "",
        nationalId: "",
        role: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
        !form.city ||
        !form.name ||
        !form.email ||
        !form.phone ||
        !form.password ||
        !form.confirmPassword ||
        !form.age ||
        !form.nationalId ||
        !form.role
    ) {
        setError("Please fill in all fields.");
        return;
    }

    if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    if (form.nationalId.length !== 14) {
        setError("National ID must be 14 digits.");
        return;
    }

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                city: form.city,
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                age: Number(form.age),
                nationalId: form.nationalId,
                role: form.role,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || "Something went wrong.");
            return;
        }

        setSuccess("Account created successfully.");
router.push("/login")
        // Reset form
        setForm({
            city: "",
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            age: "",
            nationalId: "",
            role: "",
        });
    } catch (error) {
        console.error(error);
        setError("Unable to connect to the server.");
    }
};

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
            <div className="mx-auto w-full max-w-3xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join Souq and start using the platform
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div>
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {/* Name */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        City
                                    </label>

                                    <select
                                        id="city"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-white"
                                    >
                                        <option value="" disabled>
                                            Select your city
                                        </option>

                                        {governorates.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Age */}
                                <div>
                                    <label
                                        htmlFor="age"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Age
                                    </label>

                                    <input
                                        id="age"
                                        name="age"
                                        type="text"
                                        inputMode="numeric"
                                        value={form.age}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");

                                            setForm((prev) => ({
                                                ...prev,
                                                age: value,
                                            }));
                                        }}
                                        placeholder="Enter your age"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                                    />
                                </div>
                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                    />
                                </div>

                                {/* National ID */}
                                <div>
                                    <label
                                        htmlFor="nationalId"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        National ID
                                    </label>

                                    <input
                                        id="nationalId"
                                        name="nationalId"
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={14}
                                        value={form.nationalId}
                                        onChange={handleChange}
                                        placeholder="Enter 14-digit national ID"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Account Information
                            </h2>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {/* Email */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="example@email.com"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Confirm Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={19} />
                                            ) : (
                                                <Eye size={19} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="role"
                                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Account Type
                                    </label>

                                    <select
                                        id="role"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-white"
                                    >
                                        <option value="" disabled>
                                            Select your account role
                                        </option>

                                        {roleOptions.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                                {success}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Create Account
                        </button>

                        {/* Login */}
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-gray-900 hover:underline dark:text-white"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}
