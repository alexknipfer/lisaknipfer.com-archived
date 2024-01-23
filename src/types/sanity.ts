import type dynamicIconImports from 'lucide-react/dynamicIconImports';

export enum PageContentBuilderType {
  PAGE_DESCRIPTION = 'pageDescription',
  TIMELINE = 'timeline',
  TIMELINE_YEAR = 'timelineYear',
  TIMELINE_ITEM = 'timelineItem',
}

export type PageContentType = PageDescription | Timeline;

interface SanityArrayItemBase {
  _key: string;
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

interface TimelineItem extends SanityArrayItemBase {
  _type: PageContentBuilderType.TIMELINE_ITEM;
  name: string;
  description: string;
}

interface TimelineYear extends SanityArrayItemBase {
  _type: PageContentBuilderType.TIMELINE_YEAR;
  year: string;
  timelineItems: Array<TimelineItem>;
}

export interface Timeline {
  _type: PageContentBuilderType.TIMELINE;
  name: string;
  timelineYears: Array<TimelineYear>;
}

export interface Slug {
  _type: 'slug';
  current: string;
}
