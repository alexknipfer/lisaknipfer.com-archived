import { Heading } from '@/components/heading';
import { PageContent } from '@/components/page-content';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollView } from '@/components/scroll-view';
import { PageBuilder } from '@/components/page-builder';
import { sanity } from '@/lib/sanity';

export default async function Home() {
  const page = await sanity.getHomePage();

  return (
    <ScrollView>
      <PageWrapper>
        <Heading level="h1">{page.title}</Heading>
        <PageContent>
          <PageBuilder pageBuilder={page.pageBuilder} />
        </PageContent>
      </PageWrapper>
    </ScrollView>
  );
}
