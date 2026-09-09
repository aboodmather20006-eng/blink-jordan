import { ArrowUpRight, Camera, MapPin, MessageCircle } from 'lucide-react';
import { site } from '@/data/site';
export const metadata = { title: 'Contact' };
export default function Page() {
  return (
    <div className="wrap info-page">
      <div className="page-heading">
        <h1>LET’S TALK.</h1>
        <p>Find BLINK. Get in touch.</p>
      </div>
      <div className="contact-list">
        <div>
          <Camera size={24} />
          <h2>INSTAGRAM</h2>
          <a
            className="text-link"
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
          >
            @BLINK.JORDAN <ArrowUpRight size={18} />
          </a>
        </div>
        <div>
          <MessageCircle size={24} />
          <h2>WHATSAPP</h2>
          {site.whatsapp ? (
            <a href={site.whatsapp}>Message BLINK</a>
          ) : (
            <p className="muted">Contact number coming soon.</p>
          )}
        </div>
        <div>
          <MapPin size={24} />
          <h2>STORE LOCATION</h2>
          <p className="muted">
            {site.address ||
              'Amman, Jordan. Exact store location and opening hours coming soon.'}
          </p>
        </div>
      </div>
    </div>
  );
}
