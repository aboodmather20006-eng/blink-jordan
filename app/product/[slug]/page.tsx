import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/catalog';
import { ProductDetail } from '@/components/store/product-detail';
export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p?.name || 'Product not found' };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <ProductDetail
      key={product.id}
      product={product}
      related={getProducts()
        .filter((p) => p.id !== product.id)
        .slice(0, 4)}
    />
  );
}
