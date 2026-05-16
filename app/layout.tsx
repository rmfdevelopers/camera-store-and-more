import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const bodyFont = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap' 
});

const headingFont = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap'
});

export const metadata = {
  title: 'Camera Store and More | Professional Gear in Lagos',
  description: 'Lagos premier destination for professional digital cameras, studio lighting, drones, and filmmaking essentials.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="bg-primary text-accent antialiased">
        {children}
      </body>
    </html>
  );
}