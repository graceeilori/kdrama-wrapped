import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
