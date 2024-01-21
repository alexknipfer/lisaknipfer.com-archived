'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarRoutes } from '@/config/route-config';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.match(/^\d+$/)) {
        const index = parseInt(event.key, 10) - 1;

        if (index < SidebarRoutes.length) {
          router.push(SidebarRoutes[index].template);
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  return (
    <div className="w-60 bg-zinc-50 border-r border-zinc-200 shrink-0 p-3 text-sm">
      <Link
        href="/"
        className="flex gap-3 hover:bg-pink-100 transition-colors duration-200 p-2 rounded mb-3"
      >
        <Avatar>
          <AvatarImage src="/assets/avatar.jpg" />
          <AvatarFallback>LK</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">Lisa Knipfer</span>
          <span className="text-zinc-600">Fullfillment Expert</span>
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        {SidebarRoutes.map(({ template, label, icon }, index) => {
          const Icon = icon;
          const isCurrentPath = pathname === template;

          return (
            <Link
              key={template}
              href={template}
              className={cn(
                'transition duration-200 p-2 rounded-lg flex justify-between items-center text-pink-800',
                {
                  'hover:bg-pink-100': !isCurrentPath,
                  'bg-pink-950 text-zinc-50': isCurrentPath,
                },
              )}
            >
              <span className="flex gap-2 items-center">
                <Icon size={16} />
                <span className="font-medium">{label}</span>
              </span>
              <span
                className={cn(
                  'flex justify-center items-center w-5 h-5 rounded bg-zinc-100 border border-zinc-200 text-xs',
                  {
                    'text-zinc-50 bg-zinc-600 border-zinc-500': isCurrentPath,
                  },
                )}
              >
                {index + 1}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
