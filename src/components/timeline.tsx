import { Timeline } from '@/types/sanity';
import { Heading } from './heading';

interface Props {
  content: Timeline;
}

export function Timeline({ content }: Props) {
  return (
    <div>
      {content.timelineYears.map(({ year, timelineItems, _key }) => (
        <div key={_key} className="mb-6">
          <Heading level="h2">{year}</Heading>
          {timelineItems.map(({ name, description, _key }) => (
            <div key={_key}>
              <Heading level="h3">{name}</Heading>
              <p>{description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
