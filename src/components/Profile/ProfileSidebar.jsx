// components/Profile/ProfileSidebar.jsx

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { User, Package, MapPin, KeyRound, LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { clearProfile } from "../../store/profileSlice";

const TABS = [
    { key: "account", href: "/profile", label: "Account", icon: User },
    {
        key: "addresses",
        href: "/profile/addresses",
        label: "Addresses",
        icon: MapPin,
    },
    { key: "orders", href: "/profile/orders", label: "Orders", icon: Package },
    {
        key: "password",
        href: "/profile/change-password",
        label: "Change Password",
        icon: KeyRound,
    },
];

export default function ProfileSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const profile = useSelector((s) => s.profile.data);

    const handleLogout = () => {
        try {
            localStorage.removeItem("raya-token");
            localStorage.removeItem("loggedin");
        } catch { }
        dispatch(clearProfile());
        router.replace("/login");
    };

    return (
        <aside className="flex h-full flex-col rounded-3xl border border-black/5 bg-white p-5 shadow-[0_20px_60px_rgba(17,24,39,0.05)] sm:p-6 lg:overflow-y-auto">
            <div className="mb-6 flex items-center gap-3 border-b border-black/5 pb-5">
                <UserAvatar name={profile?.name} size={56} />
                <div className="min-w-0">
                    <p className="font-poppins! truncate text-[15px] font-semibold text-soft-black">
                        {profile?.name || "Guest"}
                    </p>
                    <p className="font-poppins! truncate text-[12px] text-secondary">
                        {profile?.email || ""}
                    </p>
                </div>
            </div>

            <nav className="flex-1">
                <ul className="space-y-1.5">
                    {TABS.map((tab) => {
                        const isActive =
                            tab.href === "/profile"
                                ? pathname === "/profile"
                                : pathname.startsWith(tab.href);
                        const Icon = tab.icon;

                        return (
                            <li key={tab.key}>
                                <Link
                                    href={tab.href}
                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium transition duration-200 font-poppins! ${isActive
                                        ? "bg-main/10 text-main"
                                        : "text-secondary hover:bg-black/[0.03] hover:text-soft-black"
                                        }`}
                                >
                                    <Icon size={18} strokeWidth={1.8} />
                                    {tab.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* ── Logout pinned to bottom ── */}
            <div className="mt-4 border-t border-black/5 pt-3">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-secondary transition duration-200 hover:bg-red-50 hover:text-red-500 font-poppins!"
                >
                    <LogOut size={18} strokeWidth={1.8} />
                    Logout
                </button>
            </div>
        </aside>
    );
}