import { PageContentBuilderType, PageContentType } from '@/types/sanity';

import { PageDescription as PageDescriptionComponent } from '@/components/page-description';
import { Timeline as TimelineComponent } from '@/components/timeline';

export function renderPageBuilderComponent(content: PageContentType) {
  switch (content._type) {
    case PageContentBuilderType.PAGE_DESCRIPTION:
      return <PageDescriptionComponent content={content} />;
    case PageContentBuilderType.TIMELINE:
      return <TimelineComponent content={content} />;
    default:
      return null;
  }
}
