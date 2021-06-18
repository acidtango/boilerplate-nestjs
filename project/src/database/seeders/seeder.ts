/* eslint-disable no-console */
import booksSeeder from './books.seeder'

async function run(): Promise<void> {
  await booksSeeder()
}

run()
  .then(() => {
    console.info('✅ All seeders executed successfully')
    process.exit()
  })
  .catch((error) => {
    console.error('❌ ', error)
    process.exit(1)
  })
