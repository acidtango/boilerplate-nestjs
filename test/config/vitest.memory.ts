import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.(e2e-)test.ts', '**/*.test.ts'],
    setupFiles: './test/setups/globalSetup.ts',
  },
})
