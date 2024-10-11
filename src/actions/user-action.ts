import { auth } from '@/auth'
import db from '@/db/index'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const getCurrentUser = async () => {
  const session = await auth()

  const userId = session?.user.id || ''

  const user = await db.select().from(users).where(eq(users.id, userId))

  return user[0]
}

export const getUserByEmail = async (email: string) => {
  const user = await db.select().from(users).where(eq(users.email, email))

  return user[0]
}

export const getUserById = async (id: string) => {
  const user = await db.select().from(users).where(eq(users.id, id))

  return user[0]
}

export const setUserDesigner = async (userId: string) => {
  console.log('doing')
  const user = await db
    .update(users)
    .set({ isDesigner: true })
    .where(eq(users.id, userId))
    .returning({ curId: users.id, updatedDesigner: users.isDesigner })
  console.log('done')
}

export const updateUsage = async () => {
  try {
    const user = await getCurrentUser()

    await db
      .update(users)
      .set({ remaining: user.remaining - 4 })
      .where(eq(users.id, user.id))

    return {
      status: 'success',
      data: user.remaining - 4
    }
  } catch (error) {
    return {
      status: 'error',
      data: 'failed to update usage'
    }
  }
}
