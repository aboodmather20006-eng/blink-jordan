import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Shop } from '@/components/store/shop';
import { categories } from '@/data/categories';
import { getProducts } from '@/lib/catalog';
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      categories.find((c) => c.slug === slug)?.name || 'Category not found',
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!categories.some((c) => c.slug === slug)) notFound();
  return (
    <Suspense
      fallback={<p className="wrap section">Loading the collection…</p>}
    >
      <Shop products={getProducts()} category={slug} />
    </Suspense>
  );
}
