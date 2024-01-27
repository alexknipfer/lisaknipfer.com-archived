'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MenuItem } from '@/types/sanity';
import { cn, getSlugPath } from '@/lib/utils';

interface Props {
  menuItems: Array<MenuItem>;
  showHotkeys?: boolean;
}

export function MenuContent({ menuItems, showHotkeys = true }: Props) {
  const pathname = usePathname();

  return (
    <>
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
        {menuItems.map(({ title, slug, sidebarIcon, _id }, index) => {
          const slugPath = getSlugPath(slug);
          const isCurrentPath = pathname === slugPath;

          return (
            <Link
              key={_id}
              href={slugPath}
              className={cn(
                'flex items-center justify-between rounded-lg p-2 text-pink-800 transition duration-200',
                {
                  'hover:bg-pink-100': !isCurrentPath,
                  'bg-pink-950 text-zinc-50': isCurrentPath,
                },
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-4 w-4"
                  dangerouslySetInnerHTML={{ __html: sidebarIcon }}
                />
                <span className="font-medium">{title}</span>
              </span>
              {showHotkeys && (
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
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
