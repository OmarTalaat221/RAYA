// components/Profile/UserAvatar.jsx

import { memo } from "react";

const UserAvatar = memo(function UserAvatar({ name = "", size = 64 }) {
    const initial = name?.trim()?.charAt(0)?.toUpperCase() || "";

    return (
        <div
            style={{ width: size, height: size }}
            className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-main/10 text-main"
        >
            {initial ? (
                <span
                    className="font-oswald! font-semibold uppercase"
                    style={{ fontSize: size * 0.42 }}
                >
                    {initial}
                </span>
            ) : (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-1/2 w-1/2"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            )}
        </div>
    );
});

export default UserAvatar;