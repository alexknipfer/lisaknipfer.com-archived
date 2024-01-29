import 'server-only';
import { createClient, QueryParams, SanityClient } from 'next-sanity';

import { SanityPageWithBuilder, Settings } from '@/types/sanity';
import { env } from '@/env/client';
import {
  homeQuery,
  pageBySlugQuery,
  settingsQuery,
} from '@/lib/sanity.queries';

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
      query: settingsQuery,
      tags: ['settings'],
    });
  }

  public getHomePage() {
    return this.sanityFetch<SanityPageWithBuilder>({
      query: homeQuery,
      tags: ['home'],
    });
  }

  public getPageBySlug(slug: string) {
    return this.sanityFetch<SanityPageWithBuilder>({
      query: pageBySlugQuery,
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
}

export const sanity = new Sanity();
