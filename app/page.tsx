import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/catalog';
import { ProductGrid } from '@/components/store/product-card';
function Heading({
  title,
  href,
  label = 'VIEW ALL',
}: {
  title: string;
  href: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <Link className="text-link" href={href}>
        {label}
        <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="media hero-background">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/images/hero-desktop-ultrawide.jpeg"
            />
            <img
              src="/images/hero-mobile-portrait.jpeg"
              alt="Black graphic T-shirt and sneakers displayed on sunlit concrete steps"
              width={1122}
              height={1402}
              fetchPriority="high"
              decoding="async"
              style={{ position: 'absolute', inset: 0 }}
            />
          </picture>
        </div>
        <div className="hero-copy">
          <p className="hero-eyebrow">DISCOVER NEW ESSENTIALS</p>
          <h1 id="hero-title" className="hero-headline">
            YOUR FIT.
            <br />
            YOUR RULES.
          </h1>
          <p className="hero-tagline">
            <span className="hero-copy-desktop">EVERYDAY PIECES. YOUR WAY.</span>
            <span className="hero-copy-mobile">EVERYDAY. YOUR WAY.</span>
          </p>
          <Link href="/shop?collection=new" className="hero-cta">
            <span className="hero-copy-desktop">SHOP NEW ARRIVALS</span>
            <span className="hero-copy-mobile">SHOP NOW</span>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="section wrap homepage-categories">
        <Heading title="SHOP BY CATEGORY" href="/shop" label="SHOP ALL" />
        <div className="category-grid">
          {[
            { slug: 't-shirts', name: 'T-SHIRTS', alt: 'Cream BOYS MIDNIGHT CREW T-shirt' },
            { slug: 'shirts', name: 'SHIRTS', alt: 'Burgundy long-sleeve shirt' },
            { slug: 'pants', name: 'PANTS', alt: 'Light blue wide-leg jeans' },
            { slug: 'shoes', name: 'SHOES', alt: 'Retro sneakers' },
          ].map((c) => (
            <Link
              href={`/category/${c.slug}`}
              key={c.slug}
              className={`category-tile category-tile-${c.slug}`}
            >
              <div className="category-image">
                <Image
                  src={`/images/categories/${c.slug}.jpeg`}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 800px) 50vw, 25vw"
                  unoptimized
                  style={{ objectFit: 'contain' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section wrap homepage-new-arrivals">
        <Heading title="NEW ARRIVALS" href="/shop?collection=new" />
        <ProductGrid
          products={getProducts().filter((p) => p.newArrival)}
          presentation="homepage"
        />
      </section>
    </>
  );
}
