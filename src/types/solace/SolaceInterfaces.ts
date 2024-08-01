import {
  Status,
  SdVersion,
  Scheduler,
  PresetStyle,
  TransformType,
} from "@/types/solace/solaceEnums";

interface GeneratedImageVariationGenericsInterface {
  readonly id: string;
  readonly status: Status;
  readonly transformType: TransformType;
  readonly url: string;
}

interface GeneratedImagesInterface {
  readonly generated_image_variation_generics: Array<GeneratedImageVariationGenericsInterface | null>;
  readonly fantasyAvatar: boolean;
  readonly id: string;
  readonly image_to_video: boolean;
  readonly likeCount: number;
  readonly motion: boolean;
  readonly motionModel: string;
  readonly motionMP4URL: string;
  readonly motionStrength: number;
  readonly nsfw: boolean;
  readonly url: string;
}

interface LoraInterface {
  readonly akUUID: string;
  readonly baseModel: string;
  readonly description: string;
  readonly name: string;
  readonly urlImage: string;
  readonly weightDefault: number;
  readonly weightMax: number;
  readonly weightMin: number;
}

interface GenerationElementsInterface {
  readonly id: number;
  readonly lora: LoraInterface;
  readonly weightApplied: number;
}

export interface SolaceGeneration {
  readonly createdAt: string;
  readonly generated_images: Array<GeneratedImagesInterface | null>;
  readonly generation_elements: Array<GenerationElementsInterface | null>;
  readonly guidanceScale: number;
  readonly id: string;
  readonly imageHeight: number;
  readonly imageWidth: number;
  readonly inferenceSteps: number;
  readonly initStrength: number;
  readonly modelId: number;
  readonly negativePrompt: string;
  readonly photoReal: boolean;
  readonly photoRealStrength: number;
  readonly presetStyle: PresetStyle;
  readonly prompt: string;
  readonly promptMagic: boolean;
  readonly promptMagicVersion: number;
  readonly public: boolean;
  readonly scheduler: Scheduler;
  readonly sdVersion: SdVersion;
  readonly seed: number;
  readonly status: Status;
}
