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
    <div className="w-60 shrink-0 border-r border-zinc-200 bg-zinc-50 p-3 text-sm xl:w-72">
      <Link
        href="/"
        className="mb-3 flex gap-3 rounded p-2 transition-colors duration-200 hover:bg-pink-100"
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
                'flex items-center justify-between rounded-lg p-2 text-pink-800 transition duration-200',
                {
                  'hover:bg-pink-100': !isCurrentPath,
                  'bg-pink-950 text-zinc-50': isCurrentPath,
                },
              )}
            >
              <span className="flex items-center gap-2">
                <Icon size={16} />
                <span className="font-medium">{label}</span>
              </span>
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded border border-zinc-200 bg-zinc-100 text-xs',
                  {
                    'border-zinc-500 bg-zinc-600 text-zinc-50': isCurrentPath,
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
