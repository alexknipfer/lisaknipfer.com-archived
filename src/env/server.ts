import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SANITY_REVALIDATE_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});
