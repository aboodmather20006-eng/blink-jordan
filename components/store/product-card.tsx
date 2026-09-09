'use client';

import Link from 'next/link';
import { useId, useState, type CSSProperties } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Product } from '@/data/types';
import { Media } from './media';
import { useCart } from './cart-context';

export function ProductCard({ product, onNavigate, catalog = false }: { product: Product; onNavigate?: () => void; catalog?: boolean }) {
  const cart = useCart();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const backgroundFilterId = useId();
  const isBarTShirt = product.slug === 'bar-black-graphic-t-shirt';
  const price = product.price === undefined ? null : `${product.price.toFixed(2)} JOD`;
  const canAdd = (variant: Product['variants'][number]) => {
    const quantity = cart.lines.find((line) => line.variantId === variant.id)?.quantity ?? 0;
    return variant.available && variant.stock > quantity;
  };

  const artwork = (
    <>
          {isBarTShirt && (
            <svg className="product-image-filter" aria-hidden="true" focusable="false">
              <defs>
                <filter id={backgroundFilterId} colorInterpolationFilters="sRGB">
                  {/* Mask only the near-white backdrop; keep source shirt RGB unchanged. */}
                  <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.333333 0.333333 0.333334 0 0"
                  />
                  <feComponentTransfer result="background">
                    <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 1" />
                  </feComponentTransfer>
                  <feComposite in="SourceGraphic" in2="background" operator="out" />
                </filter>
              </defs>
            </svg>
          )}
          <Media
            className="product-primary"
            src={product.images[0]}
            alt={product.name}
            fit="contain"
            sizes="(max-width: 800px) 50vw, 25vw"
          />
          {product.images[1] && (
            <Media
              className="alternate"
              src={product.images[1]}
              alt={`${product.name}, alternate view`}
              fit="contain"
              sizes="(max-width: 800px) 50vw, 25vw"
            />
          )}

    </>
  );

  if (catalog) {
    return (
      <article className="catalog-card" data-product={product.slug} data-category={product.category}>
        <Link className="catalog-card-link" href={`/product/${product.slug}`} onClick={onNavigate}>
          <div className="catalog-image">
            <div
              className="catalog-artwork"
              data-has-alternate={Boolean(product.images[1]) || undefined}
              style={isBarTShirt ? {
                '--product-background-filter': `url(#${backgroundFilterId})`,
              } as CSSProperties : undefined}
            >
              {artwork}
            </div>
            <span className="catalog-view-product" aria-hidden="true">VIEW PRODUCT →</span>
          </div>
          <div className="catalog-meta">
            <h3>{product.name}</h3>
            {price !== null && <p className="catalog-price">{price}</p>}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className="product-card"
      data-category={product.category}
      data-product={product.slug}
      data-quick-add-open={quickAddOpen || undefined}
    >
      <div className="product-visual">
        <Link
          className="product-image-link"
          href={`/product/${product.slug}`}
          onClick={onNavigate}
          aria-label={`View ${product.name}`}
          data-has-alternate={Boolean(product.images[1]) || undefined}
          style={isBarTShirt ? {
            '--product-background-filter': `url(#${backgroundFilterId})`,
          } as CSSProperties : undefined}
        >
          {artwork}
        </Link>
        <Popover open={quickAddOpen} onOpenChange={setQuickAddOpen}>
          <PopoverTrigger
            className="product-quick-add"
            aria-label={`Add to cart: ${product.name}`}
            disabled={!cart.ready || !product.variants.some(canAdd)}
          >
            ADD TO CART
          </PopoverTrigger>
          <PopoverContent className="product-size-picker" side="top" sideOffset={8}>
            <div className="product-size-heading">
              <PopoverTitle>Select size</PopoverTitle>
              <button type="button" onClick={() => setQuickAddOpen(false)}>Close</button>
            </div>
            <PopoverDescription className="sr-only">
              Choose a size to add {product.name} to your bag.
            </PopoverDescription>
            <div className="product-quick-sizes">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!cart.ready || !canAdd(variant)}
                  aria-label={`Add ${product.name}, size ${variant.size} to bag`}
                  onClick={() => {
                    if (!cart.ready || !canAdd(variant)) return;
                    setQuickAddOpen(false);
                    onNavigate?.();
                    cart.add({
                      productId: product.id,
                      variantId: variant.id,
                      productName: product.name,
                      productImage: product.images[0],
                      selectedSize: variant.size,
                      quantity: 1,
                    });
                  }}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="product-meta">
        <Link href={`/product/${product.slug}`} onClick={onNavigate}>
          <h3>{product.name}</h3>
        </Link>
        {price !== null && <p className="product-price">{price}</p>}
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  onNavigate,
  presentation = 'standard',
}: {
  products: Product[];
  onNavigate?: () => void;
  presentation?: 'standard' | 'homepage' | 'catalog';
}) {
  return (
    <div className={presentation === 'catalog' ? 'catalog-product-grid' : `product-grid ${presentation === 'homepage' ? 'homepage-product-grid' : ''}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onNavigate={onNavigate} catalog={presentation === 'catalog'} />
      ))}
    </div>
  );
}
