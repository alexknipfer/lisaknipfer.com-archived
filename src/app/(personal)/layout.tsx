import { Suspense } from 'react';

import Sidebar from '@/components/sidebar';
import { sanity } from '@/lib/sanity';

export default async function DynamicPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems = await sanity.getMenuItems();

  return (
    <div className="flex bg-white">
      <Suspense>
        <Sidebar menuItems={menuItems} />
      </Suspense>
      <div>{children}</div>
    </div>
  );
}
