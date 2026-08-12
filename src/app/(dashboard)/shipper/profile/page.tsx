"use client";

import { useState } from "react";
import {
    Pencil,
    Save,
    X,
    Trash2,
    Mail,
    Phone,
    MapPin,
    User,
    Shield,
    Calendar,
    CreditCard,
} from "lucide-react";

const cities = [
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

type UserData = {
    name: string;
    email: string;
    phone: string;
    city: string;
    age: string;
    nationalId: string;
    role: string;
};

const initialUser: UserData = {
    name: "Akram Hany",
    email: "akram@example.com",
    phone: "01012345678",
    city: "Dakahlia",
    age: "25",
    nationalId: "29801011234567",
    role: "Admin",
};

export default function ProfilePage() {
    const [user, setUser] = useState<UserData>(initialUser);

    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState({
        email: user.email,
        phone: user.phone,
        city: user.city,
        password: "",
        confirmPassword: "",
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (form.password && form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setUser((prev) => ({
            ...prev,
            email: form.email,
            phone: form.phone,
            city: form.city,
        }));

        setForm((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
        }));

        setIsEditing(false);
    };

    const handleCancel = () => {
        setForm({
            email: user.email,
            phone: user.phone,
            city: user.city,
            password: "",
            confirmPassword: "",
        });

        setIsEditing(false);
    };

    const handleDeleteAccount = () => {
        // API call will be added later.
        console.log("Delete account");
        setShowDeleteModal(false);
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Profile
                        </h1>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage your personal information and account settings.
                        </p>
                    </div>

                    {!isEditing && (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            <Pencil size={17} />
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Card */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    {/* Profile Header */}
                    <div className="border-b border-gray-200 px-6 py-6 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <User
                                    size={30}
                                    className="text-gray-600 dark:text-gray-300"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {user.name}
                                </h2>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="p-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                            Personal Information
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {/* Name */}
                            <div>
                                <InfoLabel icon={<User size={17} />} label="Full Name" />

                                <InfoValue value={user.name} />
                            </div>

                            {/* Age */}
                            <div>
                                <InfoLabel
                                    icon={<Calendar size={17} />}
                                    label="Age"
                                />

                                <InfoValue value={user.age} />
                            </div>

                            {/* National ID */}
                            <div>
                                <InfoLabel
                                    icon={<CreditCard size={17} />}
                                    label="National ID"
                                />

                                <InfoValue value={user.nationalId} />
                            </div>

                            {/* Role */}
                            <div>
                                <InfoLabel
                                    icon={<Shield size={17} />}
                                    label="Role"
                                />

                                <InfoValue value={user.role} />
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="border-t border-gray-200 p-6 dark:border-gray-800">
                        <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                            Account Information
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {/* Email */}
                            <div>
                                <InfoLabel
                                    icon={<Mail size={17} />}
                                    label="Email"
                                />

                                {isEditing ? (
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                ) : (
                                    <InfoValue value={user.email} />
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <InfoLabel
                                    icon={<Phone size={17} />}
                                    label="Phone Number"
                                />

                                {isEditing ? (
                                    <input
                                        name="phone"
                                        type="text"
                                        inputMode="numeric"
                                        value={form.phone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");

                                            setForm((prev) => ({
                                                ...prev,
                                                phone: value,
                                            }));
                                        }}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />
                                ) : (
                                    <InfoValue value={user.phone} />
                                )}
                            </div>

                            {/* City */}
                            <div>
                                <InfoLabel
                                    icon={<MapPin size={17} />}
                                    label="City"
                                />

                                {isEditing ? (
                                    <select
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    >
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <InfoValue value={user.city} />
                                )}
                            </div>

                            {/* Password */}
                            {isEditing && (
                                <>
                                    <div>
                                        <InfoLabel
                                            icon={<Shield size={17} />}
                                            label="New Password"
                                        />

                                        <input
                                            name="password"
                                            type="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="Leave empty to keep current password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <InfoLabel
                                            icon={<Shield size={17} />}
                                            label="Confirm Password"
                                        />

                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your new password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Edit Actions */}
                        {isEditing && (
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    <X size={17} />
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <Save size={17} />
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="mt-6 rounded-2xl border border-red-200 bg-white p-6 dark:border-red-900/50 dark:bg-gray-900">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                                Danger Zone
                            </h3>

                            <p className="mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                                Deleting your account is permanent. All of your account
                                data will be permanently removed and cannot be recovered.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                            <Trash2 size={17} />
                            Delete Account
                        </button>
                    </div>
                </section>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                            <Trash2
                                size={22}
                                className="text-red-600 dark:text-red-400"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Delete Account?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Are you sure you want to permanently delete your account?
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                <Trash2 size={17} />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function InfoLabel({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {icon}
            <span>{label}</span>
        </div>
    );
}

function InfoValue({ value }: { value: string }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white">
            {value}
        </div>
    );
}
