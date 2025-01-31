import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-test.ts'],
    env: {
      ENABLE_TEST_ORM_REPOSITORIES: 'true',
    },
    setupFiles: './test/setups/globalSetup.ts',
  },
})
