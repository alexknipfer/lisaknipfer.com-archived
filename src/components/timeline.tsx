import { Timeline } from '@/types/sanity';
import { Heading } from '@/components/heading';
import { TimelineItem } from './timeline-item';

interface Props {
  content: Timeline;
}

export function Timeline({ content }: Props) {
  return (
    <div className="flex flex-col gap-10">
      {content.timelineYears.map(({ year, timelineItems, _key }, index) => (
        <div key={_key} className="grid gap-4 md:grid-cols-12 md:gap-12">
          <div className="col-span-2 flex items-baseline">
            <Heading level="h2">{year}</Heading>
          </div>
          <section className="col-span-10">
            <div className="flex flex-col">
              {timelineItems.map((timelineItem, index) => (
                <div key={_key} className="relative flex gap-4 pb-4 last:pb-0">
                  {index !== timelineItems.length - 1 && (
                    <div className="absolute inset-0 flex w-6 items-center justify-center pt-6">
                      <div className="h-full border-l border-pink-200" />
                    </div>
                  )}
                  <div className="z-0 shrink-0">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.timelineItemIcon,
                      }}
                    />
                  </div>
                  <TimelineItem
                    timelineItem={timelineItem}
                    isPriorityImage={index < 3}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
