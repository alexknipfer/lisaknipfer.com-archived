'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { SanityPage } from '@/types/sanity-page.interface';

interface Props {
  pages: Array<SanityPage>;
}

export default function Sidebar({ pages }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.match(/^\d+$/)) {
        const index = parseInt(event.key, 10) - 1;

        if (index < pages.length) {
          router.push(pages[index].slug);
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [pages]);

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
        {pages.map(({ title, slug, sidebarIcon }, index) => {
          const isCurrentPath = pathname === slug;

          return (
            <Link
              key={slug}
              href={slug}
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