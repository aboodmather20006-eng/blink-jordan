'use client';

import { useSearchParams } from 'next/navigation';
import type { Product } from '@/data/types';
import { categories } from '@/data/categories';
import { ProductGrid } from './product-card';

export function Shop({ products, category }: { products: Product[]; category?: string }) {
  const params = useSearchParams();
  const collection = params.get('collection');
  const visible = products.filter(
    (product) =>
      (!category || product.category === category) &&
      (collection !== 'new' || product.newArrival),
  );
  const title = category
    ? categories.find((item) => item.slug === category)?.name
    : collection === 'new'
      ? 'New Arrivals'
      : 'Shop';

  return (
    <div className="wrap shop">
      <div className="catalog-heading">
        <h1>{title?.toUpperCase()}</h1>
        <p aria-live="polite">{visible.length} {visible.length === 1 ? 'PIECE' : 'PIECES'}</p>
      </div>
      <ProductGrid products={visible} presentation="catalog" />
    </div>
  );
}
