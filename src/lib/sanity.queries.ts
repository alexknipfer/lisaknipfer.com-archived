import { groq } from 'next-sanity';

const pageBuilderQuery = groq`
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

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    socialItems
  }
`;
export const homeQuery = groq`
  *[_type == 'home'][0] {
    title,
    ${pageBuilderQuery}
  }
`;

export const pageBySlugQuery = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    title,
    ${pageBuilderQuery}
  }
`;
