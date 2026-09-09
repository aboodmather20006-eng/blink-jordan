import Link from 'next/link';
export const metadata = { title: 'Shipping & Returns' };
export default function Page() {
  return (
    <div className="wrap info-page">
      <div className="page-heading">
        <h1>SHIPPING & RETURNS</h1>
        <p>Official policy details are coming soon.</p>
      </div>
      <div className="policy">
        <section>
          <h2>DELIVERY</h2>
          <p>
            Delivery coverage, fees and estimated times will be confirmed by
            BLINK. The fee shown at demo checkout is a placeholder.
          </p>
        </section>
        <section>
          <h2>RETURNS & EXCHANGES</h2>
          <p>
            The return window, eligibility and exchange process are awaiting
            BLINK’s official policy. No sample terms are presented as store
            policy.
          </p>
        </section>
        <section>
          <h2>NEED HELP?</h2>
          <p>
            Visit our contact page to find the available ways to reach BLINK.
          </p>
          <Link href="/contact" className="text-link">
            CONTACT BLINK ↗
          </Link>
        </section>
      </div>
    </div>
  );
}
