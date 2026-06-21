// components/Profile/ErrorBanner.jsx

import { AlertCircle } from "lucide-react";

export default function ErrorBanner({ error }) {
    if (!error) return null;

    const lines = String(error).split("\n").filter(Boolean);

    if (lines.length <= 1) {
        return (
            <div
                role="alert"
                className="mb-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3"
            >
                <AlertCircle size={16} className="shrink-0 text-red-500" />
                <p className="font-poppins! text-[13px] font-medium text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3"
        >
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
            <ul className="font-poppins! space-y-1">
                {lines.map((line, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-2 text-[13px] leading-6 text-red-600"
                    >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-red-400" />
                        {line}
                    </li>
                ))}
            </ul>
        </div>
    );
}