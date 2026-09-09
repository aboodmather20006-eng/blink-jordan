import { Skeleton } from '@/components/ui/skeleton';
export default function Loading() {
  return (
    <output className="wrap section block" aria-label="Loading products">
      <Skeleton className="h-10 w-56 mb-8 rounded-none" />
      <div className="product-grid">
        {[0, 1, 2, 3].map((n) => (
          <div key={n}>
            <Skeleton className="aspect-[3/4] w-full rounded-none" />
            <Skeleton className="h-4 w-3/4 mt-4 rounded-none" />
          </div>
        ))}
      </div>
    </output>
  );
}
