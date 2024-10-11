import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const modelEnum = pgEnum('model', [
  'leonardo_kino_xl',
  'leonardo_phoenix'
])

export const modelEnumSchema = z.enum(modelEnum.enumValues)
