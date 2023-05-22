// Please keep this alphabetically ordered.
export const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '27017', 10),
    username: process.env.DB_USERNAME || 'acid',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'develop',
  },
  queue: {
    username: process.env.QUEUE_USERNAME || 'acid',
    password: process.env.QUEUE_PASSWORD || 'password',
    host: process.env.QUEUE_HOST || 'localhost',
    port: process.env.QUEUE_PORT || '5672',
  },
  deployEnvironment: process.env.DEPLOY_ENV || 'dev',
  forceEnableORMRepositories: process.env.ENABLE_TEST_ORM_REPOSITORIES === 'true',
  listeningPort: parseInt(process.env.APP_PORT || '8080', 10),
  apiPrefix: process.env.API_PREFIX || 'api/',
  testModeEnabled: process.env.NODE_ENV === 'test',
  runThirdPartyTests: process.env.RUN_THIRD_PARTY_TESTS === 'true',
}
