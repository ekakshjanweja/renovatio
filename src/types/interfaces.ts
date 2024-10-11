export interface Room {
  id: string
  name: string
  description: string
  images: string[]
  imageForGeneration: string | null
  projectId: string
}

export interface Project {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  userId: string | null
  thumbnailUrl: string | null
  location: string
  area: number
  description: string
  category: string
  images: string[]
  designerId: string | null
}
