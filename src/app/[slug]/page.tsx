import { Heading } from '@/components/heading';
import { PageContent } from '@/components/page-content';
import { PageWrapper } from '@/components/page-wrapper';
import { ScrollView } from '@/components/scroll-view';
import { PageBuilder } from '@/components/page-builder';
import { sanity } from '@/lib/sanity';

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  // const page = await sanity.getPageBySlug(params.slug);

  return (
    <h3>Testing</h3>
    // <ScrollView>
    //   <PageWrapper>
    //     <Heading level="h1">{page.title}</Heading>
    //     <PageContent>
    //       <PageBuilder pageBuilder={page.pageBuilder} />
    //     </PageContent>
    //   </PageWrapper>
    // </ScrollView>
  );
}

// export async function generateStaticParams() {
//   const pages = await sanity.getPages();

//   return pages.map((page) => ({
//     slug: page.slug.current,
//   }));
// }
