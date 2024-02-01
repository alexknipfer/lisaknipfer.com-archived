import { Suspense } from 'react';

import { Heading } from '@/components/heading';
import { PageContent } from '@/components/page-content';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollView } from '@/components/scroll-view';
import { Header } from '@/components/header';
import { sanity } from '@/lib/sanity.client';
import { RecentlyPlayedTracks } from './components/recently-played-tracks';

export default async function Tracks() {
  const page = await sanity.getPageBySlug('tracks');

  return (
    <ScrollView>
      <Header />
      <PageWrapper>
        <Heading level="h1" className="mb-6">
          {page.title}
        </Heading>
        <PageContent>
          <Suspense>
            <RecentlyPlayedTracks />
          </Suspense>
        </PageContent>
      </PageWrapper>
    </ScrollView>
  );
}
