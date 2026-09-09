'use client';
import { useRef, useState, type SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from './cart-context';
import { EmptyCart } from './cart';
import { Choice } from './controls';
import { Media } from './media';
import { governorates } from '@/data/site';
import type { CheckoutData } from '@/data/types';
import { resolveLine } from '@/lib/catalog';
import { submitDemoCheckout, validateCheckout } from '@/lib/checkout';
import Link from 'next/link';
export function Checkout() {
  const cart = useCart();
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const lock = useRef(false);
  const [data, setData] = useState<CheckoutData>({
    fullName: '',
    phone: '',
    governorate: '',
    area: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutData, string>>
  >({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState('');
  const set = (key: keyof CheckoutData, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const next = validateCheckout(data);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    if (!cart.lines.length) return;
    lock.current = true;
    setBusy(true);
    setFailure('');
    try {
      const result = await submitDemoCheckout(data);
      try {
        sessionStorage.setItem('blink-demo-receipt', result.number);
      } catch {
        /* The success route also clearly labels itself a demo. */
      }
      cart.clear();
      router.push('/order-success');
    } catch {
      setFailure('The demo could not finish. Please try again.');
      setBusy(false);
      lock.current = false;
    }
  }
  const field = (
    key: keyof CheckoutData,
    label: string,
    autoComplete?: string,
    placeholder?: string,
    multiline = false,
  ) => (
    <label className={`field ${multiline ? 'span-two' : ''}`}>
      <span>
        {label}
        {key !== 'notes' ? ' *' : ''}
      </span>
      {multiline ? (
        <textarea
          name={key}
          value={data[key]}
          onChange={(e) => set(key, e.target.value)}
          maxLength={key === 'notes' ? 500 : 300}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        />
      ) : (
        <input
          name={key}
          value={data[key]}
          onChange={(e) => set(key, e.target.value)}
          type={key === 'phone' ? 'tel' : 'text'}
          maxLength={key === 'phone' ? 22 : 100}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        />
      )}{' '}
      {errors[key] && (
        <span className="error" id={`${key}-error`}>
          {errors[key]}
        </span>
      )}
    </label>
  );
  if (!cart.ready)
    return (
      <output className="wrap section">
        Loading checkout…
      </output>
    );
  if (!cart.lines.length && !busy)
    return (
      <div className="wrap">
        <EmptyCart />
      </div>
    );
  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/cart">Cart</Link>
        <span>/</span>
        <span>Checkout</span>
      </nav>
      <div className="page-heading">
        <h1>CHECKOUT</h1>
        <p>Just a few details, and you’re all set.</p>
      </div>
      <div className="demo-notice">
        FRONTEND DEMO — No real order will be placed and no payment will be
        collected.
      </div>
      <div className="commerce-grid">
        <form ref={form} onSubmit={submit} noValidate>
          <fieldset disabled={busy} className="checkout-fields">
            <legend>DELIVERY DETAILS</legend>
            {field('fullName', 'FULL NAME', 'name')}
            {field('phone', 'PHONE NUMBER', 'tel', '07X XXX XXXX')}
            <div className="field">
              <span id="governorate-label">GOVERNORATE *</span>
              <div
                aria-invalid={!!errors.governorate}
                tabIndex={errors.governorate ? -1 : undefined}
              >
                <Choice
                  label="Governorate"
                  value={data.governorate}
                  onChange={(v) => set('governorate', v)}
                  options={[
                    { value: '', label: 'Choose governorate' },
                    ...governorates.map((v) => ({ value: v, label: v })),
                  ]}
                />
              </div>
              {errors.governorate && (
                <span className="error" role="alert">
                  {errors.governorate}
                </span>
              )}
            </div>
            {field('area', 'AREA', 'address-level3')}
            {field(
              'address',
              'FULL ADDRESS',
              'street-address',
              'Street, building, floor and apartment',
              true,
            )}
            {field(
              'notes',
              'ORDER NOTES',
              undefined,
              'Anything you would like us to know?',
              true,
            )}
          </fieldset>
          <section className="payment">
            <h2>PAYMENT METHOD</h2>
            <RadioGroup value="cod" aria-label="Payment method">
              <label htmlFor="payment-cod">
                <RadioGroupItem id="payment-cod" value="cod" />
                Cash on delivery
              </label>
            </RadioGroup>
            <p className="muted">
              Demo payment selection. No payment is processed.
            </p>
          </section>
          {failure && (
            <p className="error" role="alert">
              {failure}
            </p>
          )}
          <button className="button full" type="submit" disabled={busy}>
            {busy ? 'PROCESSING DEMO…' : 'PLACE ORDER'}
            <ArrowRight size={18} />
          </button>
        </form>
        <aside className="checkout-summary">
          <h2>YOUR ORDER</h2>
          {cart.lines.map((l) => {
            const item = resolveLine(l);
            return (
              item && (
                <div key={l.variantId} className="summary-item">
                  <Media
                    src={item.product.images[0]}
                    alt={item.product.name}
                    sizes="70px"
                  />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p className="muted">
                      SIZE {item.variant.size} · Qty {item.quantity}
                    </p>
                  </div>
                </div>
              )
            );
          })}
          <p className="sample-note">Order totals are not shown in this prototype.</p>
        </aside>
      </div>
    </div>
  );
}
export function OrderSuccess() {
  return (
    <div className="wrap success">
      <div className="success-check">
        <Check size={28} />
      </div>
      <p className="eyebrow">FRONTEND DEMO</p>
      <h1>ORDER RECEIVED</h1>
      <p>Thank you for shopping with BLINK.</p>
      <p className="muted">
        Demo order number: <strong>BLK-1042</strong>
      </p>
      <p className="sample-note">
        This is a demonstration confirmation. No real order has been placed.
      </p>
      <Link href="/shop" className="button">
        CONTINUE SHOPPING <ArrowRight size={18} />
      </Link>
    </div>
  );
}
