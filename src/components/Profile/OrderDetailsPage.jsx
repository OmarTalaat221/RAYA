// components/Profile/OrderDetailsPage.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { getProfileOrderById } from "../../services/profile.service";
import { adaptOrderDetailResponse } from "./orders.adapter";

function formatDate(iso) {
    if (!iso) return "";
    try {
        return new Date(iso).toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "";
    }
}

function formatMoney(amount, currency) {
    const value = Number(amount || 0).toFixed(2);
    return `${(currency || "AED").toUpperCase()} ${value}`;
}

export default function OrderDetailsPage({ orderId }) {
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!orderId) return;
        let active = true;

        async function load() {
            setLoading(true);
            setError("");
            try {
                const response = await getProfileOrderById(orderId);
                if (!active) return;
                const adapted = adaptOrderDetailResponse(response);
                setOrder(adapted);
            } catch (err) {
                if (!active) return;
                console.error("[OrderDetails] failed:", err);
                setError(err?.response?.data?.message || "Failed to load order.");
            } finally {
                if (active) setLoading(false);
            }
        }

        load();
        return () => {
            active = false;
        };
    }, [orderId]);

    if (loading) {
        return (
            <div className="h-[500px] animate-pulse rounded-3xl bg-white/70" />
        );
    }

    if (error || !order) {
        return (
            <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <p className="font-poppins! text-sm text-red-600">
                    {error || "Order not found."}
                </p>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="font-poppins! mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-soft-black hover:border-main hover:text-main"
                >
                    <ArrowLeft size={14} />
                    Back
                </button>
            </section>
        );
    }

    const address = order.shippingAddress || {};

    return (
        <section className="rounded-3xl border border-black/5 bg-white p-5 sm:p-8 lg:h-full lg:overflow-y-auto scrollbar-hide">
            <div className="mb-6">
                <Link
                    href="/profile/orders"
                    className="font-poppins! inline-flex items-center gap-2 text-[13px] font-medium text-secondary hover:text-main"
                >
                    <ArrowLeft size={14} />
                    Back to orders
                </Link>
            </div>

            <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-black/5 pb-5">
                <div>
                    <h2 className="font-oswald! text-2xl font-semibold uppercase tracking-wide text-soft-black sm:text-3xl">
                        Order #{order.shortId}
                    </h2>
                    <p className="font-poppins! mt-1 text-[13px] text-secondary">
                        Placed on {formatDate(order.createdAt)}
                    </p>
                </div>
                <OrderStatusBadge status={order.status} />
            </div>

            <div className="mb-6">
                <h3 className="font-poppins! mb-3 text-[13px] font-semibold uppercase tracking-wider text-secondary">
                    Items ({order.items.length})
                </h3>
                <ul className="space-y-3">
                    {order.items.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3"
                        >
                            {item.image && (
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                                    <Image
                                        src={item.image}
                                        alt={item.productName}
                                        fill
                                        sizes="64px"
                                        className="object-contain p-1"
                                    />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                {item.productHref ? (
                                    <Link
                                        href={item.productHref}
                                        className="font-poppins! line-clamp-2 text-[13px] font-medium text-soft-black hover:text-main"
                                    >
                                        {item.productName}
                                    </Link>
                                ) : (
                                    <p className="font-poppins! line-clamp-2 text-[13px] font-medium text-soft-black">
                                        {item.productName}
                                    </p>
                                )}
                                <p className="font-poppins! mt-1 text-[12px] text-secondary">
                                    Qty: {item.quantity} ·{" "}
                                    {formatMoney(item.unitPrice, item.currency)}
                                </p>
                            </div>
                            <p className="font-poppins! shrink-0 text-[13px] font-semibold text-soft-black">
                                {formatMoney(item.totalPrice, item.currency)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {address && (
                <div className="mb-6">
                    <h3 className="font-poppins! mb-3 text-[13px] font-semibold uppercase tracking-wider text-secondary">
                        Shipping Address
                    </h3>
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
                        <p className="font-poppins! text-[14px] font-medium text-soft-black">
                            {address.firstName} {address.lastName}
                        </p>
                        <p className="font-poppins! mt-1 text-[13px] leading-6 text-secondary">
                            {[
                                address.streetAddress,
                                address.apartment,
                                address.city,
                                address.state,
                                address.zipCode,
                                address.country,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        </p>
                        {address.phone && (
                            <p className="font-poppins! mt-1 text-[13px] text-secondary">
                                {address.phone}
                            </p>
                        )}
                        {address.email && (
                            <p className="font-poppins! text-[13px] text-secondary">
                                {address.email}
                            </p>
                        )}
                        {address.deliveryNotes && (
                            <p className="font-poppins! mt-2 border-t border-gray-200 pt-2 text-[12px] italic text-secondary">
                                Notes: {address.deliveryNotes}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-1.5 border-t border-black/5 pt-5">
                <div className="flex items-center justify-between">
                    <p className="font-poppins! text-[13px] text-secondary">Subtotal</p>
                    <p className="font-poppins! text-[13px] font-medium text-soft-black">
                        {formatMoney(order.subtotal, order.currency)}
                    </p>
                </div>

                {order.shippingAmount > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="font-poppins! text-[13px] text-secondary">
                            Shipping ({order.shippingType})
                        </p>
                        <p className="font-poppins! text-[13px] font-medium text-soft-black">
                            {formatMoney(order.shippingAmount, order.currency)}
                        </p>
                    </div>
                )}

                {order.discountAmount > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="font-poppins! text-[13px] text-main">
                            Discount {order.couponCode ? `(${order.couponCode})` : ""}
                        </p>
                        <p className="font-poppins! text-[13px] font-medium text-main">
                            −{formatMoney(order.discountAmount, order.currency)}
                        </p>
                    </div>
                )}

                <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-2">
                    <p className="font-poppins! text-[14px] font-bold text-soft-black">
                        Total
                    </p>
                    <p className="font-poppins! text-[15px] font-bold text-soft-black">
                        {formatMoney(order.total, order.currency)}
                    </p>
                </div>
            </div>
        </section>
    );
}