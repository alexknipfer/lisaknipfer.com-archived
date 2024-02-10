import { PageContentBuilderType, SanityPageWithBuilder } from '@/types/sanity';

import { PageDescription as PageDescriptionComponent } from '@/components/page-description';
import { Timeline as TimelineComponent } from '@/components/timeline';
import { PersonalInformation } from './personal-information';

interface Props {
  pageBuilder: SanityPageWithBuilder['pageBuilder'];
}

export function PageBuilder({ pageBuilder }: Props) {
  return (
    <>
      {pageBuilder.map((content) => {
        switch (content._type) {
          case PageContentBuilderType.PAGE_DESCRIPTION:
            return (
              <PageDescriptionComponent key={content._type} content={content} />
            );
          case PageContentBuilderType.TIMELINE:
            return <TimelineComponent key={content._type} content={content} />;
          case PageContentBuilderType.PERSONAL_INFORMATION:
            return (
              <PersonalInformation key={content._type} content={content} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
