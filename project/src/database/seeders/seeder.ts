/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-empty-function
async function run(): Promise<void> {}

run()
  .then(() => {
    console.info('✅ All seeders executed successfully')
    process.exit()
  })
  .catch((error) => {
    console.error('❌ ', error)
    process.exit(1)
  })
