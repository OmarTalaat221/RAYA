// components/Profile/OrderCard.jsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

function formatDate(iso) {
    if (!iso) return "";
    try {
        return new Date(iso).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "";
    }
}

function formatMoney(amount, currency) {
    const value = Number(amount || 0).toFixed(2);
    return `${(currency || "AED").toUpperCase()} ${value}`;
}

export default function OrderCard({ order }) {
    const itemsCount = order.items.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const previewItems = order.items.slice(0, 4);
    const remaining = order.items.length - previewItems.length;

    return (
        <article className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-black/5 pb-4">
                <div>
                    <p className="font-poppins! text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                        Order #{order.shortId}
                    </p>
                    <p className="font-poppins! mt-1 text-[13px] text-soft-black">
                        {formatDate(order.createdAt)}
                    </p>
                </div>

                <OrderStatusBadge status={order.status} />
            </div>

            <div className="mb-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                    {previewItems.map((item) =>
                        item.image ? (
                            <div
                                key={item.id}
                                className="relative h-12 w-12 overflow-hidden rounded-xl border-2 border-white bg-gray-50 shadow-sm"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.productName}
                                    fill
                                    sizes="48px"
                                    className="object-contain p-1"
                                />
                            </div>
                        ) : (
                            <div
                                key={item.id}
                                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-gray-100 text-[10px] font-semibold text-secondary shadow-sm"
                            >
                                IMG
                            </div>
                        )
                    )}
                    {remaining > 0 && (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-soft-black text-[11px] font-semibold text-white shadow-sm">
                            +{remaining}
                        </div>
                    )}
                </div>

                <p className="font-poppins! text-[13px] text-secondary">
                    {itemsCount} {itemsCount === 1 ? "item" : "items"}
                </p>
            </div>

            <ul className="mb-4 space-y-2">
                {order.items.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between gap-3"
                    >
                        <p className="font-poppins! truncate text-[13px] font-medium text-soft-black">
                            {item.productName}
                            <span className="text-secondary"> × {item.quantity}</span>
                        </p>
                        <p className="font-poppins! shrink-0 text-[13px] font-semibold text-soft-black">
                            {formatMoney(item.totalPrice, item.currency)}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="mb-4">
                <Link
                    href={`/profile/orders/${order.id}`}
                    className="font-poppins! inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-4 text-[12px] font-medium text-soft-black transition hover:border-main hover:text-main"
                >
                    View Details
                    <ArrowRight size={13} strokeWidth={2} />
                </Link>
            </div>

            <div className="space-y-1.5 border-t border-black/5 pt-4">
                <div className="flex items-center justify-between">
                    <p className="font-poppins! text-[13px] text-secondary">Subtotal</p>
                    <p className="font-poppins! text-[13px] font-medium text-soft-black">
                        {formatMoney(order.subtotal, order.currency)}
                    </p>
                </div>

                {order.shippingAmount > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="font-poppins! text-[13px] text-secondary">Shipping</p>
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

                <div className="flex items-center justify-between pt-1.5">
                    <p className="font-poppins! text-[14px] font-bold text-soft-black">
                        Total
                    </p>
                    <p className="font-poppins! text-[15px] font-bold text-soft-black">
                        {formatMoney(order.total, order.currency)}
                    </p>
                </div>
            </div>
        </article>
    );
}