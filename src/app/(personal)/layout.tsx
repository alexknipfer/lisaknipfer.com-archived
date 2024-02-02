import Sidebar from '@/components/sidebar';
import { sanity } from '@/lib/sanity.client';

export default async function DynamicPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await sanity.getSettings();

  return (
    <div className="flex bg-white">
      <Sidebar settings={settings} />
      {children}
    </div>
  );
}
