import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'StellarScope - Stellar Analytics Dashboard',
  description: 'A lightweight analytics dashboard for the Stellar ecosystem and Soroban contracts.',
  keywords: ['Stellar', 'Soroban', 'Analytics', 'Dashboard'],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen bg-slate-900">
          {children}
        </main>
      </body>
    </html>
  );
}
