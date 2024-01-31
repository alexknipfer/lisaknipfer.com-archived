import { Heading } from '@/components/heading';
import { PageContent } from '@/components/page-content';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollView } from '@/components/scroll-view';
import { Header } from '@/components/header';
import { spotify } from '@/lib/spotify.client';
import { sanity } from '@/lib/sanity.client';

export default async function Tracks() {
  const [recentlyPlayed, page] = await Promise.all([
    spotify.getRecentlyPlayed(),
    sanity.getPageBySlug('tracks'),
  ]);

  return (
    <ScrollView>
      <Header />
      <PageWrapper>
        <Heading level="h1" className="mb-6">
          {page.title}
        </Heading>
        <PageContent>
          {recentlyPlayed.items.map(({ track }) => (
            <div key={track.id} className="mb-5">
              {track.name}
            </div>
          ))}
        </PageContent>
      </PageWrapper>
    </ScrollView>
  );
}
