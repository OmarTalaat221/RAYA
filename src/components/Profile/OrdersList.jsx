// components/Profile/OrdersList.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import OrderCard from "./OrderCard";
import { getProfileOrders } from "../../services/profile.service";
import { adaptOrdersResponse } from "./orders.adapter";

const FILTERS = [
    { key: "ALL", label: "All" },
    { key: "FULFIL", label: "In Transit" },
    { key: "SHIPPED", label: "Delivered" },
    { key: "CANCELLED", label: "Cancelled" },
    { key: "RETURN", label: "Returned" },
];

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeFilter, setActiveFilter] = useState("ALL");

    useEffect(() => {
        let active = true;

        async function load() {
            setLoading(true);
            setError("");

            try {
                const response = await getProfileOrders({ page: 1, limit: 50 });
                if (!active) return;

                const adapted = adaptOrdersResponse(response);
                setOrders(adapted.items);
            } catch (err) {
                if (!active) return;
                console.error("[Orders] load failed:", err);
                setError(err?.message || "Failed to load orders.");
            } finally {
                if (active) setLoading(false);
            }
        }

        load();
        return () => {
            active = false;
        };
    }, []);

    const filteredOrders =
        activeFilter === "ALL"
            ? orders
            : orders.filter((o) => o.status === activeFilter);

    return (
        <section className="rounded-3xl border border-black/5 bg-white p-5 sm:p-8 lg:h-full lg:overflow-y-auto scrollbar-hide">
            <div className="mb-6">
                <h2 className="font-oswald! text-2xl font-semibold uppercase tracking-wide text-soft-black sm:text-3xl">
                    My Orders
                </h2>
                <p className="font-poppins! mt-1 text-sm text-secondary">
                    Track and manage your orders
                </p>
            </div>

            <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-2">
                {FILTERS.map((filter) => {
                    const isActive = activeFilter === filter.key;
                    const count =
                        filter.key === "ALL"
                            ? orders.length
                            : orders.filter((o) => o.status === filter.key).length;

                    return (
                        <button
                            key={filter.key}
                            type="button"
                            onClick={() => setActiveFilter(filter.key)}
                            className={`font-poppins! inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[12.5px] font-medium transition-all duration-200 ${isActive
                                ? "border-main bg-main text-white"
                                : "border-black/10 bg-white text-secondary hover:border-main/30 hover:text-main"
                                }`}
                        >
                            {filter.label}
                            <span
                                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-black/5 text-soft-black"
                                    }`}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-[220px] animate-pulse rounded-3xl bg-black/5"
                        />
                    ))}
                </div>
            ) : error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="font-poppins! text-sm text-red-600">{error}</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                        <Package size={28} strokeWidth={1.5} className="text-secondary" />
                    </div>
                    <h3 className="font-oswald! text-lg font-semibold text-soft-black">
                        No orders yet
                    </h3>
                    <p className="font-poppins! mt-1 max-w-[36ch] text-sm text-secondary">
                        {activeFilter === "ALL"
                            ? "Start shopping to see your orders here."
                            : "No orders match this filter."}
                    </p>
                    {activeFilter === "ALL" && (
                        <Link
                            href="/collections"
                            className="font-poppins! mt-6 inline-flex h-11 items-center justify-center rounded-full bg-main px-6 text-[13px] font-semibold uppercase tracking-wider text-white shadow-[0_10px_24px_rgba(104,188,82,0.22)] transition hover:bg-[#5fb14a]"
                        >
                            Browse Products
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </section>
    );
}