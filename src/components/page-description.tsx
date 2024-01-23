import { PageDescription } from '@/types/sanity';

interface Props {
  content: PageDescription;
}

export function PageDescription({ content }: Props) {
  return <p className="mb-5 leading-7">{content.description}</p>;
}
