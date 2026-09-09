'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/types';
import { Media } from './media';
import { ProductGrid } from './product-card';
import { useCart } from './cart-context';

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const cart = useCart();
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const sizesRef = useRef<HTMLFieldSetElement>(null);

  function add() {
    if (!size) {
      setError('Please select a size.');
      sizesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const variant = product.variants.find((item) => item.size === size);
    if (!variant) return;
    cart.add({
      productId: product.id,
      variantId: variant.id,
      productName: product.name,
      productImage: product.images[0],
      selectedSize: size,
      quantity: 1,
    });
    setError('');
  }

  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>
      <div className="product-detail">
        <div className="product-gallery">
          <div className="gallery-image">
            <Media
              src={product.images[0]}
              alt={product.name}
              priority
              sizes="(max-width: 800px) 100vw, 55vw"
              fit="contain"
            />
          </div>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          {product.price !== undefined && (
            <p className="detail-price">{product.price.toFixed(2)} JOD</p>
          )}
          <p className="product-description">{product.description}</p>
          <div className="product-info-divider" aria-hidden="true" />
          <fieldset
            ref={sizesRef}
            className={`variant-field ${error ? 'invalid' : ''}`}
            aria-describedby={error ? 'size-error' : undefined}
          >
            <legend>SELECT SIZE</legend>
            <div className="size-options">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={item === size}
                  onClick={() => {
                    setSize(item);
                    setError('');
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            {error && <p role="alert" id="size-error" className="error">{error}</p>}
          </fieldset>
          <button className="button full" onClick={add} disabled={!cart.ready}>
            ADD TO BAG <ArrowRight size={17} />
          </button>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section">
          <div className="section-heading"><h2>YOU MAY ALSO LIKE</h2></div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
