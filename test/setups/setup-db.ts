import { TestApi } from '../utils/TestApi'

afterAll(async () => {
  const testApi = await TestApi.create()
  await testApi.close()
})
