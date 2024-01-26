import type dynamicIconImports from 'lucide-react/dynamicIconImports';

export enum PageContentBuilderType {
  PAGE_DESCRIPTION = 'pageDescription',
  TIMELINE = 'timeline',
  TIMELINE_YEAR = 'timelineYear',
  TIMELINE_ITEM = 'timelineItem',
}

export type PageContentType = PageDescriptionContent | Timeline;

interface SanityArrayItemBase {
  _key: string;
}

export interface MenuItem {
  _type: string;
  title: string;
  sidebarIcon: string;
  slug: string | null;
}

export interface Settings {
  menuItems: Array<MenuItem>;
}

export interface SanityPageWithBuilder extends SanityPage {
  pageBuilder: Array<PageDescriptionContent | Timeline>;
}

export interface SanityPage {
  _id: string;
  title: string;
  sidebarOrder: number;
  sidebarIcon: keyof typeof dynamicIconImports;
  slug: string;
}

export interface PageDescriptionContent {
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
  timelineItemIcon: string;
  timelineYears: Array<TimelineYear>;
}
