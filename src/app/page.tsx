import Heading from '@/components/heading';
import PageContent from '@/components/page-content';
import { ScrollView } from '@/components/scroll-view';

export default function Home() {
  return (
    <ScrollView>
      <Heading level="h2">About Me</Heading>
      <PageContent>
        <p>This is the about me section</p>
      </PageContent>
    </ScrollView>
  );
}
