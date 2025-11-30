export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="h-48 bg-muted" />

      <div className="p-5 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />

        <div className="flex gap-2 mt-4">
          <div className="h-5 w-16 bg-muted rounded" />
          <div className="h-5 w-12 bg-muted rounded" />
        </div>

        <div className="h-10 bg-muted rounded mt-4" />
      </div>
    </div>
  );
}
