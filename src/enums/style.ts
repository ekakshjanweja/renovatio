import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const styleEnum = pgEnum('style', [
  'minimalist',
  'modern',
  'traditional'
])

export const styleEnumSchema = z.enum(styleEnum.enumValues)
