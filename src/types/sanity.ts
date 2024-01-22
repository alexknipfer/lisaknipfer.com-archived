import type dynamicIconImports from 'lucide-react/dynamicIconImports';

enum PageContentBuilderType {
  PAGE_DESCRIPTION = 'pageDescription',
  TIMELINE = 'timeline',
}

export interface SanityPageWithBuilder extends SanityPage {
  pageBuilder: Array<PageDescription | Timeline>;
}

export interface SanityPage {
  title: string;
  sidebarOrder: number;
  sidebarIcon: keyof typeof dynamicIconImports;
  slug: Slug;
}

export interface PageDescription {
  _type: PageContentBuilderType.PAGE_DESCRIPTION;
  title: string;
  description: string;
}

export interface Timeline {
  _type: PageContentBuilderType.TIMELINE;
  name: string;
}

export interface Slug {
  _type: 'slug';
  current: string;
}
