import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap empty-state">
      <p className="eyebrow">404</p>
      <h1
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: '-.05em',
          marginTop: 18,
        }}
      >
        THIS ONE GOT AWAY.
      </h1>
      <p>The page or product you’re looking for isn’t here.</p>
      <Link href="/shop" className="button">
        BACK TO SHOP →
      </Link>
    </div>
  );
}
