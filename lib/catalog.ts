import { products } from '@/data/products';
import type { CartLine, Product } from '@/data/types';
export function getProducts(): Product[] {
  return products;
}
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function resolveLine<T extends Pick<CartLine, 'productId' | 'variantId'>>(
  line: T,
) {
  const product = products.find((p) => p.id === line.productId);
  const variant = product?.variants.find((v) => v.id === line.variantId);
  return product && variant ? { ...line, product, variant } : null;
}
export function normalizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const result: CartLine[] = [];
  for (const row of value) {
    if (typeof row !== 'object' || row === null) continue;
    const r = row as Record<string, unknown>;
    if (
      typeof r.productId !== 'string' ||
      typeof r.variantId !== 'string' ||
      typeof r.quantity !== 'number' ||
      !Number.isFinite(r.quantity)
    )
      continue;
    const draft = {
      productId: r.productId,
      variantId: r.variantId,
      quantity: Math.floor(r.quantity),
    };
    const resolved = resolveLine(draft);
    if (!resolved?.variant.available || draft.quantity < 1) continue;
    const line = {
      ...draft,
      productName:
        typeof r.productName === 'string' ? r.productName : resolved.product.name,
      productImage:
        typeof r.productImage === 'string'
          ? r.productImage
          : resolved.product.images[0],
      selectedSize:
        typeof r.selectedSize === 'string'
          ? r.selectedSize
          : resolved.variant.size,
    };
    const previous = result.find(
      (l) => l.variantId === line.variantId && l.productId === line.productId,
    );
    if (previous)
      previous.quantity = Math.min(
        previous.quantity + line.quantity,
        resolved.variant.stock,
      );
    else
      result.push({
        ...line,
        quantity: Math.min(line.quantity, resolved.variant.stock),
      });
  }
  return result;
}
