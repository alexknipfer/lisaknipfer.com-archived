import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    PUBLIC_SANITY_DATASET: z.string().min(1),
    PUBLIC_SANITY_API_VERSION: z.string().min(1),
  },
  experimental__runtimeEnv: {
    PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
});
