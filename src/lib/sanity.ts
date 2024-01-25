import 'server-only';
import { createClient, QueryParams, SanityClient } from 'next-sanity';

import { appConfig } from '@/config/app-config';
import {
  MenuItem,
  SanityPage,
  SanityPageWithBuilder,
  Settings,
} from '@/types/sanity';

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

  public getSettings() {
    return this.sanityFetch<Settings>({
      query: `
        *[_type == "settings"][0]{
          menuItems[]->{
            _type,
            "slug": slug.current,
            title,
            sidebarIcon
          },
      }`,
      tags: ['settings', 'page', 'home'],
    });
  }

  // public getPages(pageTypes = ['page']) {
  //   return this.sanityFetch<Array<SanityPage>>({
  //     query: `
  //       *[${pageTypes.map((pageType) => `_type == '${pageType}'`).join('||')}] | order(sidebarOrder asc) {
  //         _id,
  //         title,
  //         sidebarOrder,
  //         sidebarIcon,
  //         "slug": slug.current
  //       }
  //     `,
  //     tags: ['page', 'home'],
  //   });
  // }

  public getHomePage() {
    return this.sanityFetch<SanityPageWithBuilder>({
      query: `
        *[_type == 'home'][0] {
          title,
          ${this.pageBuilderQuery}
        }
      `,
      tags: ['home', 'page'],
    });
  }

  public getPageBySlug(slug: string) {
    console.log('SLUG: ', `page:${slug}`);
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
      tags: [`page:${slug}`],
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
    return `
      pageBuilder[]{
        _type == 'pageDescription' => {
          _type,
          title,
          description
        },
        _type == 'timeline' => {
          _type,
          name,
          timelineYears | order(year desc)
        }
      }
    `;
  }
}

export const sanity = new Sanity();
