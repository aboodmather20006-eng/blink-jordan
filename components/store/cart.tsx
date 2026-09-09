'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { resolveLine } from '@/lib/catalog';
import { Media } from './media';
import { Quantity } from './controls';
import { useCart } from './cart-context';

export function EmptyCart() {
  const cart = useCart();
  return (
    <div className="empty-state">
      <ShoppingBag size={32} style={{ margin: '0 auto 22px' }} />
      <h2>YOUR BAG IS EMPTY.</h2>
      <p>Find something you love.</p>
      <Link href="/shop" className="button" onClick={() => cart.setOpen(false)}>SHOP NOW <ArrowRight size={18} /></Link>
    </div>
  );
}

export function CartItems() {
  const cart = useCart();
  return <div className="cart-items">{cart.lines.map((line) => {
    const item = resolveLine(line);
    if (!item) return null;
    return <article className="cart-line" key={line.variantId}>
      <Link href={`/product/${item.product.slug}`} onClick={() => cart.setOpen(false)} className="cart-image">
        <Media src={line.productImage} alt={line.productName} sizes="110px" fit="contain" />
      </Link>
      <div className="cart-line-info">
        <Link href={`/product/${item.product.slug}`} onClick={() => cart.setOpen(false)} className="cart-name">{line.productName}</Link>
        <p className="cart-size">SIZE {line.selectedSize}</p>
        {item.product.price !== undefined && <p className="cart-price">{item.product.price.toFixed(2)} JOD</p>}
        <div className="cart-line-actions">
          <Quantity value={item.quantity} max={item.variant.stock} onChange={(quantity) => cart.update(line.variantId, quantity)} />
        </div>
      </div>
      <button aria-label={`Remove ${item.product.name}`} onClick={() => cart.remove(line.variantId)} className="cart-remove icon-button"><Trash2 size={16} /></button>
    </article>;
  })}</div>;
}

export function CartSummary() {
  const cart = useCart();
  const subtotal = cart.lines.reduce((total, line) => {
    const item = resolveLine(line);
    return total + (item?.product.price ?? 0) * line.quantity;
  }, 0);
  return <div className="cart-summary">
    <div className="summary-row"><span>Subtotal</span><strong>{subtotal.toFixed(2)} JOD</strong></div>
    <Link href="/checkout" className="button full" onClick={() => cart.setOpen(false)}>CHECKOUT <ArrowRight size={18} /></Link>
  </div>;
}

export function CartDrawer() {
  const cart = useCart();
  return <Sheet open={cart.open} onOpenChange={cart.setOpen}>
    <SheetContent className="drawer cart-drawer">
      <SheetTitle className="drawer-title">YOUR BAG ({cart.count})</SheetTitle>
      <SheetDescription className="sr-only">Review your selected items and continue to checkout.</SheetDescription>
      {cart.lines.length ? <><CartItems /><CartSummary /><div className="cart-secondary-actions"><Link href="/cart" onClick={() => cart.setOpen(false)} className="text-link">VIEW BAG</Link><button className="button outline full" onClick={() => cart.setOpen(false)}>CONTINUE SHOPPING</button></div></> : <EmptyCart />}
    </SheetContent>
  </Sheet>;
}

export function CartPage() {
  const cart = useCart();
  return <div className="wrap"><div className="page-heading"><h1>YOUR BAG</h1></div>{!cart.ready ? <output>Loading your bag…</output> : cart.lines.length ? <div className="commerce-grid"><CartItems /><CartSummary /></div> : <EmptyCart />}</div>;
}
