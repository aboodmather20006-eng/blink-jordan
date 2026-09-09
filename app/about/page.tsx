import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Media } from '@/components/store/media';
import { images } from '@/data/images';
export const metadata = { title: 'About' };
export default function Page() {
  return (
    <div className="wrap">
      <div className="page-heading">
        <h1>ABOUT BLINK</h1>
      </div>
      <div className="about-grid">
        <Media
          src={images.denim}
          alt="Everyday menswear inspiration"
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <div>
          <p className="eyebrow">BLINK JORDAN</p>
          <h2>
            Everyday pieces.
            <br />
            Your way.
          </h2>
          <p>BLINK is a fashion retailer in Amman, Jordan.</p>
          <p className="muted">
            Our brand story is coming soon. This space is ready for BLINK’s
            official story and store photography.
          </p>
          <Link href="/shop" className="text-link">
            EXPLORE THE COLLECTION <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
