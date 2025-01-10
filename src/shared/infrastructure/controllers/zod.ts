import { z as zod } from 'zod'
import { extendZodWithOpenApi } from 'zod-openapi'

extendZodWithOpenApi(zod)

export const z = zod
