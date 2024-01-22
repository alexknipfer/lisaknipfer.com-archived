import 'server-only';
import { createClient, QueryParams, SanityClient } from 'next-sanity';

import { appConfig } from '@/config/app-config';
import { SanityPage, SanityPageWithBuilder } from '@/types/sanity';

export class Sanity {
  private client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId: appConfig.sanity.projectId,
      dataset: appConfig.sanity.dataset,
      apiVersion: appConfig.sanity.apiVersion,
      useCdn: false,
    });
  }

  public getPages() {
    return this.sanityFetch<Array<SanityPage>>({
      query: `
        *[_type == 'page'] | order(sidebarOrder asc) {
          title,
          sidebarOrder,
          sidebarIcon,
          slug
        }
      `,
      tags: ['page'],
    });
  }

  public getPageById(id: string) {
    return this.sanityFetch<SanityPageWithBuilder>({
      query: `
        *[_type == 'page' && _id == $id][0] {
          title,
          ${this.pageBuilderQuery}
        }
      `,
      params: {
        id,
      },
      tags: ['page'],
    });
  }

  public getPageBySlug(slug: string) {
    return this.sanityFetch<SanityPageWithBuilder>({
      query: `
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
    return `
      pageBuilder[]{
        _type == 'pageDescription' => {
          _type,
          title,
          description
        },
        _type == 'timeline' => @-> {
          _type,
          name,
          timelineYears | order(year desc)
        }
      }
    `;
  }
}

export const sanity = new Sanity();
