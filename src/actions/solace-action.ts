'use server'

import db from '@/db'
import { solace, SolaceInsert, SolaceSelect } from '@/db/schema/solace'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from './user-action'

export const getSolaceHistory = async () => {
  const user = await getCurrentUser()

  const history = await db
    .select()
    .from(solace)
    .where(eq(solace.generatedBy, user.id))

  return {
    history: history as SolaceSelect[]
  }
}

export const saveSolaceHistory = async (image: SolaceInsert) => {
  const existingImage = (
    await db.select().from(solace).where(eq(solace, image))
  )[0]

  if (existingImage) {
    return { error: 'Image Already Exists!' }
  }

  await db.insert(solace).values(image)

  //TODO: revalidatePath
}
