import Heading from '@/components/heading';
import { ScrollView } from '@/components/scroll-view';
import { sanity } from '@/lib/sanity';

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await sanity.getPageBySlug(params.slug);

  return (
    <ScrollView>
      <Heading level="h1">{response.title}</Heading>
    </ScrollView>
  );
}

export async function generateStaticParams() {
  const pages = await sanity.getPages();

  return pages
    .filter((page) => page.slug !== null)
    .map((page) => ({
      slug: page.slug.current,
    }));
}
