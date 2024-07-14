export interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  imageForGeneration: string | null;
  projectId: string;
}
