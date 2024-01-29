import { Heading } from '@/components/heading';
import { PageContent } from '@/components/page-content';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollView } from '@/components/scroll-view';
import { PageBuilder } from '@/components/page-builder';
import { sanity } from '@/lib/sanity';
import { Header } from '@/components/header';

export default async function Timeline() {
  const page = await sanity.getPageBySlug('timeline');

  return (
    <ScrollView>
      <Header />
      <PageWrapper>
        <Heading level="h1" className="mb-6">
          {page.title}
        </Heading>
        <PageContent>
          <PageBuilder pageBuilder={page.pageBuilder} />
        </PageContent>
      </PageWrapper>
    </ScrollView>
  );
}
