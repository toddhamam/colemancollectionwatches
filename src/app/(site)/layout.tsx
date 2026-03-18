import { GSAPProvider } from '@/components/animation/GSAPProvider';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GSAPProvider>
      <Navigation />
      {children}
      <Footer />
    </GSAPProvider>
  );
}
