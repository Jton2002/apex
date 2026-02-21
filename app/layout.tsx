import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { createClient } from '@/lib/supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ApexService — Field Service Domination',
  description: 'The FSM platform that obliterates Jobber with AI-powered HVAC trade management',
  keywords: 'HVAC, field service management, AI, trade software, ApexService',
  authors: [{ name: 'ApexService Team' }],
  creator: 'ApexService',
  publisher: 'ApexService',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://apexservice.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ApexService — Field Service Domination',
    description: 'The FSM platform that obliterates Jobber with AI-powered HVAC trade management',
    url: 'https://apexservice.com',
    siteName: 'ApexService',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ApexService Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexService — Field Service Domination',
    description: 'The FSM platform that obliterates Jobber with AI-powered HVAC trade management',
    images: ['/og-image.jpg'],
    creator: '@apexservice',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        {/* Optional: Add global Hank context or providers here later */}
      </body>
    </html>
  );
}
