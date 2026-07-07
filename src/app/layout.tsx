import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Veritech CRM',
  description: 'Full-stack CRM for veritech.uk',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
