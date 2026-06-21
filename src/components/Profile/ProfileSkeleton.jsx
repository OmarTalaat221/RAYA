// components/Profile/ProfileSkeleton.jsx

export default function ProfileSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
            <div className="h-[340px] animate-pulse rounded-3xl bg-white/70" />
            <div className="h-[520px] animate-pulse rounded-3xl bg-white/70" />
        </div>
    );
}
