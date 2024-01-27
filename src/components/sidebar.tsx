'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getSlugPath } from '@/lib/utils';
import { MenuContent } from './menu-content';
import { menuRoutes } from '@/config/route-config';

interface Props {
  content: unknown;
}

export default function Sidebar(content: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.match(/^\d+$/)) {
        const index = parseInt(event.key, 10) - 1;

        if (index < menuRoutes.length) {
          router.push(getSlugPath(menuRoutes[index].template));
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [router]);

  console.warn('content: ', content);

  return (
    <div className="hidden w-60 shrink-0 border-r border-zinc-200 bg-zinc-50 p-3 text-sm lg:block xl:w-72">
      <MenuContent />
    </div>
  );
}
