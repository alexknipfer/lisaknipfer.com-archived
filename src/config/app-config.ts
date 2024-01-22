function loadEnvVar(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is required on server`);
  }

  return value;
}

export const appConfig = {
  sanity: {
    projectId: loadEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    dataset: loadEnvVar('NEXT_PUBLIC_SANITY_DATASET'),
    apiVersion: loadEnvVar('NEXT_PUBLIC_SANITY_API_VERSION'),
    revalidateSecret: loadEnvVar('SANITY_REVALIDATE_SECRET'),
    homePageId: loadEnvVar('SANITY_HOME_PAGE_ID'),
  },
};

export type AppConfig = typeof appConfig;
