import Sidebar from '@/components/sidebar';
import { sanity } from '@/lib/sanity';

export default async function DynamicPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { menuItems } = await sanity.getSettings();

  return (
    <div className="flex bg-white">
      <Sidebar menuItems={menuItems} />
      {children}
    </div>
  );
}
