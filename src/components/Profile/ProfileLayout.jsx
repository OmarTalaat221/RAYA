// components/Profile/ProfileLayout.jsx

"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import ProfileSidebar from "./ProfileSidebar";
import ErrorBanner from "./ErrorBanner";
import { fetchProfile } from "../../store/profileSlice";

const LOGO_SRC =
    "https://res.cloudinary.com/dbvh5i83q/image/upload/v1776082859/rds_logo_xpmbfn.webp";

export default function ProfileLayout({ children }) {
    const dispatch = useDispatch();
    const loading = useSelector((s) => s.profile.loading);
    const initialized = useSelector((s) => s.profile.initialized);
    const error = useSelector((s) => s.profile.error);

    useEffect(() => {
        if (!initialized) {
            dispatch(fetchProfile());
        }
    }, [dispatch, initialized]);

    /* ── Desktop-only body scroll lock ── */
    useEffect(() => {
        if (typeof window === "undefined") return;

        const apply = () => {
            if (window.innerWidth >= 1024) {
                document.documentElement.style.overflow = "hidden";
                document.body.style.overflow = "hidden";
            } else {
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
            }
        };

        apply();
        window.addEventListener("resize", apply);

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            window.removeEventListener("resize", apply);
        };
    }, []);

    return (
        <main className="flex min-h-screen flex-col bg-[#f4f3f0] lg:h-screen lg:max-h-screen lg:overflow-hidden">
            {/* ── Mini header ── */}
            <header className="shrink-0 border-b border-black/5 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto flex items-center justify-between gap-3 py-3 sm:py-4">
                    <Link
                        href="/"
                        aria-label="RDS Pharma — Back to home"
                        className="group relative block h-12 w-12 shrink-0 sm:h-14 sm:w-14"
                    >
                        <Image
                            src={LOGO_SRC}
                            alt="RDS Pharma"
                            fill
                            priority
                            sizes="56px"
                            className="object-contain transition-opacity duration-200 group-hover:opacity-80"
                        />
                    </Link>

                    <Link
                        href="/"
                        className="font-poppins! inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-[12.5px] font-medium text-soft-black transition-all duration-200 hover:border-main hover:bg-main hover:text-white sm:h-11 sm:px-5 sm:text-[13px]"
                    >
                        <ArrowLeft size={14} strokeWidth={2} />
                        <span className="hidden sm:inline">Back to Store</span>
                        <span className="sm:hidden">Store</span>
                    </Link>
                </div>
            </header>

            <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:min-h-0 lg:px-8">
                <div className="container mx-auto mb-5 w-full shrink-0 sm:mb-6">
                    <h1 className="font-oswald! text-2xl font-bold uppercase tracking-wide text-soft-black sm:text-3xl">
                        My Account
                    </h1>
                    <p className="font-poppins! mt-1 text-sm text-secondary">
                        Manage your profile and orders
                    </p>
                </div>

                <div className="container mx-auto flex w-full flex-1 flex-col lg:min-h-0">
                    {loading && !initialized ? (
                        <div className="grid grid-cols-1 gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
                            <div className="h-[420px] animate-pulse rounded-3xl bg-white/70 lg:h-full" />
                            <div className="h-[520px] animate-pulse rounded-3xl bg-white/70 lg:h-full" />
                        </div>
                    ) : error ? (
                        <ErrorBanner error={error} />
                    ) : (
                        <div className="grid grid-cols-1 gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
                            <div className="lg:h-full lg:min-h-0">
                                <ProfileSidebar />
                            </div>

                            <div className="lg:h-full lg:min-h-0 lg:pr-1">
                                {children}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}