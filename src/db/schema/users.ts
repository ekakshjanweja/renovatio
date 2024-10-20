import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image').notNull(),
  phone: text('phone'),
  isDesigner: boolean('isDesigner').default(false),
  remaining: integer('remaining').notNull().default(100),
  isPro: boolean('isPro').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})
