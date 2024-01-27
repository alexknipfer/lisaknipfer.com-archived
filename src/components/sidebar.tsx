'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getSlugPath } from '@/lib/utils';
import { MenuItem } from '@/types/sanity';
import { MenuContent } from './menu-content';

interface Props {
  menuItems: Array<MenuItem>;
}

export default function Sidebar({ menuItems }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.match(/^\d+$/)) {
        const index = parseInt(event.key, 10) - 1;

        if (index < menuItems.length) {
          router.push(getSlugPath(menuItems[index].slug));
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [router, menuItems]);

  return (
    <div className="hidden w-60 shrink-0 border-r border-zinc-200 bg-zinc-50 p-3 text-sm lg:block xl:w-72">
      <MenuContent menuItems={menuItems} />
    </div>
  );
}
