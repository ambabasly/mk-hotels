// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Patricia Hotel - Luxury Accommodations & Fine Dining',
  description: 'Experience luxury at Patricia Hotel with premium rooms, fine dining, and exclusive nightclub. Book your stay today.',
  keywords: 'hotel, luxury, accommodation, restaurant, nightclub, booking',
  openGraph: {
    title: 'Patricia Hotel - Luxury Accommodations',
    description: 'Experience luxury at Patricia Hotel with premium rooms, fine dining, and exclusive nightclub.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}