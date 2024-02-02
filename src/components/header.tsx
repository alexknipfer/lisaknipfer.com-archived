import { MobileDrawer } from './mobile-drawer';

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-white/8- sticky inset-0 z-50 flex h-12 w-full items-center border-b border-zinc-200 bg-white bg-white/80 px-2 backdrop-blur md:px-4 lg:hidden">
      <MobileDrawer />
    </header>
  );
}
