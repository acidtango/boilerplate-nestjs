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
  forceEnableORMRepositories: process.env.ENABLE_TEST_ORM_REPOSITORIES === 'true',
  listeningPort: parseInt(process.env.APP_PORT || '8080', 10),
  neutrinoApi: {
    baseURL: process.env.NEUTRINO_API_BASE_URL || 'https://neutrinoapi.net',
    userId: process.env.NEUTRINO_API_USER_ID || 'borjatango',
    apiKey: process.env.NEUTRINO_API_KEY || 'pXvFlGOA8ndrnUZV9SDKLbKMBVI2PsfX9cHyYyijZmv9zIyf',
  },
  testModeEnabled: process.env.NODE_ENV === 'test',
  runThirdPartyTests: process.env.RUN_THIRD_PARTY_TESTS === 'true',
}
