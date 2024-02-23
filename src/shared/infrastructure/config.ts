// Please keep this alphabetically ordered.
export const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '27017', 10),
    username: process.env.DB_USERNAME || 'acid',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'develop',
  },
  sqs: {
    queueUrl: process.env.SQS_QUEUE_URL || 'http://sqs.eu-west-1.localhost.localstack.cloud:4566/000000000000/local',
    host: process.env.SQS_QUEUE_HOST || 'localhost',
    port: process.env.SQS_QUEUE_PORT || '4566',
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID || 'na',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'na',
    region: process.env.AWS_REGION || 'eu-west-1',
  },
  deployEnvironment: process.env.DEPLOY_ENV || 'dev',
  forceEnableORMRepositories: process.env.ENABLE_TEST_ORM_REPOSITORIES === 'true',
  listeningPort: parseInt(process.env.APP_PORT || '8080', 10),
  apiPrefix: process.env.API_PREFIX || 'api/',
  testModeEnabled: process.env.NODE_ENV === 'test',
  runThirdPartyTests: process.env.RUN_THIRD_PARTY_TESTS === 'true',
}
