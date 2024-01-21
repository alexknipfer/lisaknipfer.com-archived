import 'server-only';
import { createClient, QueryParams, SanityClient } from 'next-sanity';

import { appConfig } from '@/config/app-config';
import { SanityPage } from '@/types/sanity-page.interface';

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
}

export const sanity = new Sanity();
