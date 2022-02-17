import { migrator } from './DatabaseMigrator'
import { MigrationResult } from 'kysely'

migrator
  .migrateDown()
  .then(({ results, error }) => (error ? Promise.reject(error) : (results as MigrationResult[])))
  .then((results) => {
    results.forEach(({ status, migrationName, direction }) => {
      console.log('Undo last migration done')

      if (status === 'Success') {
        console.log(`✅ ${migrationName} ${direction}`)
      } else if (status === 'Error') {
        console.error(`❌ ${migrationName} ${direction}`)
      }
    })
  })
  .catch((error) => {
    console.error('Undo last migration error')
    console.error(error)
    process.exit(1)
  })
