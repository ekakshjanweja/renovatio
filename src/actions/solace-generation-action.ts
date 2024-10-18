"use server";

import { Leonardo } from "@leonardo-ai/sdk";
import {
  CreateGenerationRequestBody,
  GetGenerationByIdResponseBody,
} from "@leonardo-ai/sdk/sdk/models/operations";
import { SdGenerationStyle } from "@leonardo-ai/sdk/sdk/models/shared";
import { getCurrentUser, updateUsage } from "./user-action";
import { saveSolaceHistory } from "./solace-action";
import { SolaceInsert, Variation } from "@/db/schema/solace";
import { ROOM_TYPE, roomTypeNames } from "@/lib/enums/room_type_enum";
import { STYLE, styleNames } from "@/lib/enums/style_enum";
import { modelEnumSchema } from "@/lib/enums/model_enum";

export const generateImage = async (
  prompt: string,
  roomType: ROOM_TYPE,
  numberOfImages: number,
  style: STYLE,
  isEnhanced: boolean,
  apiKey: string,
  contextualImageUrl?: string
) => {
  const leonardo = new Leonardo({
    bearerAuth: apiKey,
  });

  if (!apiKey) {
    console.log("could not find api key");
    return {
      status: "error",
      data: "could not find api key",
    };
  }

  const leonardoKinoXL = "aa77f04e-3eec-4034-9c07-d0f619684628";
  const leonardoPhoenix = "6b645e3a-d64f-4341-a6d8-7a3690fbf042";

  const options: CreateGenerationRequestBody = {
    height: 1024,
    width: 1024,
    modelId: leonardoKinoXL,
    numImages: numberOfImages,
    presetStyle: SdGenerationStyle.Cinematic,
    prompt: prompt + "; " + roomTypeNames[roomType] + "; " + styleNames[style],
    promptMagic: false,
    alchemy: false,
    photoReal: false,
  };

  const alchemyOptions: CreateGenerationRequestBody = {
    height: 1024,
    width: 1024,
    numImages: numberOfImages,
    modelId: null,
    presetStyle: SdGenerationStyle.Cinematic,
    prompt: prompt + "; " + roomTypeNames[roomType] + "; " + styleNames[style],
    promptMagic: false,
    alchemy: true,
    photoReal: true,
  };

  const currentUser = await getCurrentUser();

  if (currentUser.remaining < 4) {
    return {
      status: "error",
      data: "You have insufficient credits to generate this image.",
    };
  }

  const result = await leonardo.image.createGeneration(
    isEnhanced ? alchemyOptions : options
  );

  if (result.statusCode !== 200) {
    return {
      status: "error",
      data: "failed to initiate image generation",
    };
  }

  const job = result.object;

  const generationResponse = await getGenerations(
    job?.sdGenerationJob?.generationId!,
    apiKey,
    leonardo
  );

  if (generationResponse["data"] === "error") {
    return {
      status: "error",
      data: "failed to get generated image.",
    };
  }

  const generations = generationResponse[
    "data"
  ] as GetGenerationByIdResponseBody;

  const generatedImages = generations.generationsByPk?.generatedImages;

  if (generatedImages === undefined) {
    return {
      status: "error",
      data: "an error occurred while getting generated image",
    };
  }

  const usage = await updateUsage();

  if (usage.status === "error") {
    return {
      status: "error",
      data: "failed to update usage",
    };
  }

  const variations: Variation[] = [];

  generatedImages.forEach((image) => {
    variations.push({
      iid: image.id!,
      url: image.url!,
    });
  });

  const imageToSaveInHistory: SolaceInsert = {
    prompt: prompt,
    coverUrl:
      generatedImages[0].url === undefined ? "" : generatedImages[0].url,
    contextualImageUrl: contextualImageUrl,
    variations: variations,
    model: modelEnumSchema.Values.leonardo_kino_xl,
    numberOfImages: numberOfImages,
    generatedBy: currentUser.id,
    createdAt: new Date(),
    roomType: roomType,
    style: style,
    isEnhanced: isEnhanced,
  };

  await saveSolaceHistory(imageToSaveInHistory);

  return {
    status: "success",
    data: {
      images: generatedImages,
      usage: 200,
    },
  };
};

const getGenerations = async (
  generationId: string,
  apiKey: string,
  leonardo: Leonardo
) => {
  try {
    if (!apiKey) {
      throw new Error("could not find api key");
    }

    const result = await leonardo.image.getGenerationById(generationId);

    if (result.statusCode !== 200) {
      throw new Error("failed to get generated image.");
    }

    let generations = result.object;

    let generatedImages = generations?.generationsByPk?.generatedImages;

    if (generatedImages !== undefined && generatedImages.length === 0) {
      const result = await getGenerations(generationId, apiKey, leonardo);

      if (result["status"] === "error") {
        throw result["data"];
      }

      generations = result["data"] as GetGenerationByIdResponseBody;
    }

    return {
      status: "success",
      data: generations,
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      data: "failed to get generated image.",
    };
  }
};
