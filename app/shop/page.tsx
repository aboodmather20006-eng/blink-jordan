import { Suspense } from 'react';
import { Shop } from '@/components/store/shop';
import { getProducts } from '@/lib/catalog';
export const metadata = { title: 'Shop' };
export default function Page() {
  return (
    <Suspense
      fallback={<p className="wrap section">Loading the collection…</p>}
    >
      <Shop products={getProducts()} />
    </Suspense>
  );
}
