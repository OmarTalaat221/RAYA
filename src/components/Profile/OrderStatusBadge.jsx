// components/Profile/OrderStatusBadge.jsx

import { Truck, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

const STATUS_CONFIG = {
    FULFIL: {
        label: "In Transit",
        icon: Truck,
        className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    SHIPPED: {
        label: "Delivered",
        icon: CheckCircle2,
        className: "bg-main/10 text-main border-main/20",
    },
    CANCELLED: {
        label: "Cancelled",
        icon: XCircle,
        className: "bg-red-50 text-red-600 border-red-200",
    },
    RETURN: {
        label: "Returned",
        icon: RotateCcw,
        className: "bg-gray-100 text-gray-600 border-gray-200",
    },
};

export default function OrderStatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.FULFIL;
    const Icon = config.icon;

    return (
        <span
            className={`font-poppins! inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${config.className}`}
        >
            <Icon size={12} strokeWidth={2.2} />
            {config.label}
        </span>
    );
}