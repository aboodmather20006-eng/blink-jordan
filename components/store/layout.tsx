'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, ArrowUpRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { site } from '@/data/site';
import { categories } from '@/data/categories';
import { getProducts } from '@/lib/catalog';
import { ProductGrid } from './product-card';
import { useCart } from './cart-context';
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="BLINK Jordan home">
      <Image
        src={site.logo}
        alt="BLINK Jordan"
        fill
        sizes="170px"
        unoptimized
        style={{ objectFit: 'contain' }}
      />
    </Link>
  );
}
export function Header() {
  const cart = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim()), 220);
    return () => clearTimeout(timer);
  }, [query]);
  const results = getProducts().filter((p) =>
    [p.name, p.category, ...p.tags]
      .join(' ')
      .toLowerCase()
      .includes(debounced.toLowerCase()),
  );
  const nav = (close?:()=>void) => (
    <>
      <Link href="/shop" onClick={close}>SHOP</Link>
      <Link href="/shop?collection=new" onClick={close}>NEW ARRIVALS</Link>
      {categories.map((c) => (
        <Link key={c.slug} href={`/category/${c.slug}`} onClick={close}>
          {c.name.toUpperCase()}
        </Link>
      ))}
    </>
  );
  return (
    <>
      <header className="site-header">
        <div className="header-inner wrap">
          <button
            aria-label="Open menu"
            className="icon-button mobile-only"
            onClick={() => setMenu(true)}
          >
            <Menu size={22} />
          </button>
          <Logo />
          <nav aria-label="Main navigation" className="desktop-nav">
            {nav()}
          </nav>
          <div className="header-actions">
            <button
              aria-label="Search products"
              className="icon-button"
              onClick={() => setSearch(true)}
            >
              <Search size={21} />
            </button>
            <button
              aria-label={`Open cart, ${cart.count} items`}
              className="icon-button"
              onClick={() => cart.setOpen(true)}
            >
              <ShoppingBag size={21} />
              {cart.count > 0 && (
                <span className="cart-count">{cart.count}</span>
              )}
            </button>
          </div>
        </div>
      </header>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="drawer">
          <SheetTitle className="drawer-title">EXPLORE</SheetTitle>
          <SheetDescription className="sr-only">
            Shop BLINK categories
          </SheetDescription>
          <nav className="drawer-nav">
            {nav(()=>setMenu(false))}
          </nav>
          <Link href="/about" onClick={() => setMenu(false)}>
            About BLINK
          </Link>
          <Link href="/contact" onClick={() => setMenu(false)}>
            Contact
          </Link>
        </SheetContent>
      </Sheet>
      <Sheet open={search} onOpenChange={setSearch}>
        <SheetContent side="top" className="search-sheet">
          <SheetTitle className="drawer-title">
            FIND YOUR NEXT EVERYDAY PIECE.
          </SheetTitle>
          <SheetDescription className="sr-only">
            Search by product or category.
          </SheetDescription>
          <label className="sr-only" htmlFor="product-search">
            Search products
          </label>
          <input
            id="product-search"
            className="search-input"
            placeholder="Search t-shirts, shirts, pants…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <div aria-live="polite" className="muted">
            {debounced
              ? `${results.length} results for “${debounced}”`
              : 'EXPLORE THE COLLECTION'}
          </div>
          <div>
            {results.length ? (
              <ProductGrid products={debounced?results:results.slice(0,4)} onNavigate={()=>setSearch(false)} />
            ) : (
              <div className="empty-state">
                <h2>NO RESULTS FOUND.</h2>
                <p>Try another search or explore our categories.</p>
                <Link href="/shop" className="text-link" onClick={()=>setSearch(false)}>
                  EXPLORE ALL <ArrowUpRight size={18} />
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo />
          </div>
          <div>
            <h3>SHOP</h3>
            <nav aria-label="Footer shop">
              <Link href="/shop?collection=new">New Arrivals</Link>
              {categories.map((c) => (
                <Link href={`/category/${c.slug}`} key={c.slug}>
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3>HELP</h3>
            <nav aria-label="Help">
              <Link href="/contact">Contact</Link>
              <Link href="/size-guide">Size Guide</Link>
              <Link href="/shipping-and-returns">Shipping & Returns</Link>
            </nav>
          </div>
          <div>
            <h3>ABOUT</h3>
            <nav aria-label="About">
              <Link href="/about">About BLINK</Link>
              <a href={site.instagram} target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BLINK Jordan</span>
          <span>Jordan · JOD</span>
        </div>
      </div>
    </footer>
  );
}
