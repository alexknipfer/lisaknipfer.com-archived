import { sanity } from '@/lib/sanity';
import { MobileDrawer } from './mobile-drawer';

export async function Header() {
  const { menuItems } = await sanity.getSettings();

  return (
    <header className="supports-backdrop-blur:bg-white/8- sticky inset-0 z-50 flex h-12 w-full items-center border-b border-zinc-200 bg-white bg-white/80 px-4 backdrop-blur lg:hidden">
      <MobileDrawer menuItems={menuItems} />
    </header>
  );
}
