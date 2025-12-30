import './globals.css';

import { Inter, Bricolage_Grotesque, Reenie_Beanie } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

const reenie = Reenie_Beanie({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-reenie',
});

export const metadata = {
  title: 'K-Drama Wrapped',
  description: 'Your K-Drama year in review',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${bricolage.variable} ${reenie.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
