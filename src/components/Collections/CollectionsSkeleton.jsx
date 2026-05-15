const SKELETON_CARDS_DESKTOP = Array.from({ length: 5 });
const SKELETON_CARDS_MOBILE = Array.from({ length: 3 });

function SkeletonCard() {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]">
      <div className="relative w-full aspect-[5/3] overflow-hidden bg-gray-50">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100" />
      </div>
      <div className="px-5 py-[14px] flex items-center justify-between gap-3">
        <div className="h-3 w-24 rounded animate-pulse bg-gray-100" />
        <div className="w-7 h-7 rounded-full animate-pulse bg-gray-100" />
      </div>
    </div>
  );
}

export function DesktopSkeleton() {
  const row1 = SKELETON_CARDS_DESKTOP.slice(0, 3);
  const row2 = SKELETON_CARDS_DESKTOP.slice(3, 5);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {row1.map((_, i) => (
          <SkeletonCard key={`r1-${i}`} />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {row2.map((_, i) => (
          <div key={`r2-${i}`} className="w-[calc(33.333%-11px)]">
            <SkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileSkeleton() {
  return (
    <div className="flex gap-3 px-4 overflow-hidden">
      {SKELETON_CARDS_MOBILE.map((_, i) => (
        <div key={i} className="min-w-[75%]">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}
