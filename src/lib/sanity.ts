import 'server-only';
import { createClient, QueryParams, SanityClient, groq } from 'next-sanity';

import { SanityPageWithBuilder, Settings } from '@/types/sanity';
import { env } from '@/env/client';

export class Sanity {
  private client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      apiVersion: env.PUBLIC_SANITY_API_VERSION,
      useCdn: false,
    });
  }

  public getSettings() {
    return this.sanityFetch<Settings>({
      query: groq`
        *[_type == "settings"][0]{
          menuItems
      }`,
      tags: ['settings'],
    });
  }

  public getHomePage() {
    return this.sanityFetch<SanityPageWithBuilder>({
      query: groq`
        *[_type == 'home'][0] {
          title,
          ${this.pageBuilderQuery}
        }
      `,
      tags: ['home'],
    });
  }

  public getPageBySlug(slug: string) {
    return this.sanityFetch<SanityPageWithBuilder>({
      query: groq`
        *[_type == 'page' && slug.current == $slug][0] {
          title,
          ${this.pageBuilderQuery}
        }
      `,
      params: {
        slug,
      },
      tags: ['page'],
    });
  }

  public generateStaticSlugs(type: string) {
    return this.client
      .withConfig({
        perspective: 'published',
        useCdn: false,
        stega: false,
      })
      .fetch<Array<string>>(
        `*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
        { type },
        { next: { tags: [type] } },
      );
  }

  private async sanityFetch<QueryResponse>({
    query,
    params = {},
    tags = [],
  }: {
    query: string;
    tags: Array<string>;
    params?: QueryParams;
  }): Promise<QueryResponse> {
    return this.client.fetch<QueryResponse>(query, params, {
      cache: 'force-cache',
      next: {
        tags,
      },
    });
  }

  private get pageBuilderQuery() {
    return groq`
      pageBuilder[] {
        _type == 'pageDescription' => {
          _type,
          title,
          description
        },
        _type == 'timeline' => {
          _type,
          timelineItemIcon,
          timelineYears | order(year desc) {
            _key,
            year,
            timelineItems[] {
              _key,
              name,
              description,
              image {
                asset->{
                  url,
                  metadata
                }
              }
            }
          }
        }
      }
    `;
  }
}

export const sanity = new Sanity();
