import type { Metadata } from 'next';
import { CartProvider } from '@/components/store/cart-context';
import { Header, Footer } from '@/components/store/layout';
import { CartDrawer } from '@/components/store/cart';
import { AgentTools } from '@/components/store/agent-tools';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BLINK Jordan — Everyday pieces. Your way.',
    template: '%s | BLINK Jordan',
  },
  description:
    'Explore the BLINK Jordan fashion storefront. Browse everyday pieces, find your fit, and make it your own.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AgentTools/>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
