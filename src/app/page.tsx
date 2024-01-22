import Heading from '@/components/heading';
import PageContent from '@/components/page-content';
import { ScrollView } from '@/components/scroll-view';
import { appConfig } from '@/config/app-config';
import { sanity } from '@/lib/sanity';

export default async function Home() {
  const response = await sanity.getPageById(appConfig.sanity.homePageId);

  return (
    <ScrollView>
      <Heading level="h1">{response.title}</Heading>
      <PageContent>
        <p>This is the about me section</p>
      </PageContent>
    </ScrollView>
  );
}
