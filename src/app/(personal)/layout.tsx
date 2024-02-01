import Sidebar from '@/components/sidebar';

export default async function DynamicPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-white">
      <Sidebar />
      {children}
    </div>
  );
}
