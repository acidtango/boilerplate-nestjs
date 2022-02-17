// Please keep this alphabetically ordered.
export const config = {
  db: {
    postgresql: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'acid',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'develop',
    },
  },
  deployEnvironment: process.env.DEPLOY_ENV || 'dev',
  forceDbConnection: process.env.FORCE_DB_CONNECTION === 'true',
  listeningPort: parseInt(process.env.APP_PORT || '8080', 10),
  apiVersioningPrefix: process.env.API_VERSIONING_PREFIX || 'api/v',
  neutrinoApi: {
    baseURL: process.env.NEUTRINO_API_BASE_URL || 'https://neutrinoapi.net',
    userId: process.env.NEUTRINO_API_USER_ID || '',
    apiKey: process.env.NEUTRINO_API_KEY || '',
  },
  testModeEnabled: process.env.NODE_ENV === 'test',
  runThirdPartyTests: process.env.RUN_THIRD_PARTY_TESTS === 'true',
}
