export interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  imageForGeneration: string | null;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string | null;
  thumbnailUrl: string | null;
  location: string;
  area: number;
  description: string;
  category: string;
  images: string[];
  designerId: string | null;
}

export interface ImageGenerationJob {
  generationId: string;
  apiCreditCost: number;
}

export interface Generations {
  createdAt: string;
  generated_images: GeneratedImage[];
  generation_elements: GenerationElement[];
  guidanceScale: number;
  id: string;
  imageHeight: number;
  imageWidth: number;
  inferenceSteps: number;
  initStrength: number;
  modelId: string;
  negativePrompt: string;
  photoReal: boolean;
  photoRealStrength: number;
  presetStyle: string;
  prompt: string;
  promptMagic: boolean;
  promptMagicStrength: number;
  promptMagicVersion: string;
  public: boolean;
  scheduler: string;
  sdVersion: string;
  seed: number;
  status: string;
}
export interface GeneratedImage {
  generated_image_variation_generics: GeneratedImageVariationGeneric[];
  fantasyAvatar: boolean;
  id: string;
  imageToVideo: boolean;
  likeCount: number;
  motion: boolean;
  motionModel: string;
  motionMP4URL: string;
  motionStrength: number;
  nsfw: boolean;
  url: string;
}

export interface GeneratedImageVariationGeneric {
  id: string;
  status: string;
  transformType: string;
  url: string;
}

export interface GenerationElement {
  id: number;
  lora: Lora;
  weightApplied: number;
}

export interface Lora {
  akUUID: string;
  baseModel: string;
  description: string;
  name: string;
  urlImage: string;
  weightDefault: number;
  weightMax: number;
  weightMin: number;
}
