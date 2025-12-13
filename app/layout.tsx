import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aklima Baiguisova - Product Strategy & SaaS Mentor',
  description: 'I help B2B SaaS teams turn complex workflows into simple, human products and make calm, confident product decisions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">{children}</body>
    </html>
  );
}

