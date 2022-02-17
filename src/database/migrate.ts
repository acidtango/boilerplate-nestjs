import { migrator } from './DatabaseMigrator'
import { MigrationResult } from 'kysely'

migrator
  .migrateToLatest()
  .then(({ results, error }) => (error ? Promise.reject(error) : (results as MigrationResult[])))
  .then((results) => {
    results.forEach(({ status, migrationName, direction }) => {
      console.log('Migration done')

      if (status === 'Success') {
        console.log(`✅ ${migrationName} ${direction}`)
      } else if (status === 'Error') {
        console.error(`❌ ${migrationName} ${direction}`)
      }
    })
  })
  .catch((error) => {
    console.error('Migration error')
    console.error(error)
    process.exit(1)
  })
