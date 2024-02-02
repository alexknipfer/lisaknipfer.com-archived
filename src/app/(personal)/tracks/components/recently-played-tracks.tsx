import Image from 'next/image';

import { spotify } from '@/lib/spotify.client';
import { SpotifyTrack } from '@/types/spotify';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function getSmallestTrackImage(track: SpotifyTrack) {
  return track.album.images.length > 0
    ? track.album.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
    : null;
}

export async function RecentlyPlayedTracks() {
  const tracks = await spotify.getRecentlyPlayed();

  return (
    <section className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[70px]" />
            <TableHead className="min-w-[150px]">Song</TableHead>
            <TableHead className="hidden min-w-[150px] md:table-cell">
              Artist(s)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.items.map(({ track }) => {
            const image = getSmallestTrackImage(track);

            return (
              <TableRow key={track.id}>
                <TableCell>
                  {image && (
                    <Image
                      src={image.url}
                      width={image.width}
                      height={image.height}
                      alt={`Album cover image for ${track.name}`}
                      className="h-10 w-10"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={track.external_urls.spotify}
                    className="block text-nowrap font-medium hover:underline hover:underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.name}
                  </a>
                  <span className="text-gray-500 md:hidden">
                    {track.album.name}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {track.artists.map((artist) => artist.name).join(', ')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
