import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'HospitalOS — Adaptive Resource Scheduling',
    template: '%s | HospitalOS',
  },
  description:
    'HospitalOS: an OS-inspired hospital management system with adaptive resource scheduling, secure file management, real-time monitoring, and role-based access control.',
  keywords: ['hospital', 'scheduling', 'resource management', 'medical', 'healthcare'],
  authors: [{ name: 'HospitalOS Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07080f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              expand={false}
              richColors
              toastOptions={{
                duration: 4000,
                style: {
                  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
