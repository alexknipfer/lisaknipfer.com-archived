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
  _id: string;
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

export interface TimelineItem extends SanityArrayItemBase {
  _type: PageContentBuilderType.TIMELINE_ITEM;
  _key: string;
  name: string;
  description: string;
  image: SanityImage;
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

export interface SanityImage {
  asset: {
    url: string;
    metadata: SanityImageMetadata;
  };
}

export interface SanityImageMetadata {
  isOpaque: boolean;
  blurHash: string;
  hasAlpha: boolean;
  lqip: string;
  dimensions: {
    aspectRatio: number;
    height: number;
    width: number;
  };
}
