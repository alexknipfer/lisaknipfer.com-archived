import Image from 'next/image';

import { TimelineItem } from '@/types/sanity';

interface Props {
  timelineItem: TimelineItem;
  isPriorityImage: boolean;
}

export function TimelineItem({
  timelineItem: { name, description, image },
  isPriorityImage,
}: Props) {
  return (
    <div className="flex-grow pl-4 md:pl-8">
      <span className="font-semibold">{name}</span>
      <p className="text-sm">{description}</p>
      {!!image && (
        <div className="mt-2 overflow-hidden rounded-xl">
          <Image
            className="animate-reveal"
            src={image.asset.url}
            width={image.asset.metadata.dimensions.width}
            height={image.asset.metadata.dimensions.height}
            alt={`Image representing ${name}`}
            priority={isPriorityImage}
          />
        </div>
      )}
    </div>
  );
}
