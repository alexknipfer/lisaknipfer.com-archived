import { Slug } from '@/types/sanity';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSlugPath(slug: Slug | null) {
  return slug ? `/${slug.current}` : '/';
}
