import type dynamicIconImports from 'lucide-react/dynamicIconImports';

export interface SanityPage {
  title: string;
  sidebarOrder: number;
  sidebarIcon: keyof typeof dynamicIconImports;
  slug: string;
}
