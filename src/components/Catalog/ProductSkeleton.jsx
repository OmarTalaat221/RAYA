export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="aspect-square w-full bg-gray-100" />

      <div className="flex flex-col items-center gap-3 px-5 py-6">
        <div className="h-4 w-3/4 rounded-full bg-gray-100" />
        <div className="h-3 w-1/2 rounded-full bg-gray-100" />
        <div className="h-px w-8 bg-gray-100" />
        <div className="h-5 w-1/3 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
