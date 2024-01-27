import { Heading } from '@/components/heading';
import { PageContent } from '@/components/page-content';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollView } from '@/components/scroll-view';
import { PageBuilder } from '@/components/page-builder';
import { sanity } from '@/lib/sanity';
import { Header } from '@/components/header';

// TODO: Add generateStaticParams after the following issue is resolved:
// https://github.com/vercel/next.js/issues/59883
export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await sanity.getPageBySlug(params.slug);

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

export function generateStaticParams() {
  return sanity.generateStaticSlugs('page');
}
