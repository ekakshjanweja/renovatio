"use server";

import { Generations, ImageGenerationJob } from "@/types/interfaces";
import { Leonardo } from "@leonardo-ai/sdk";
import {
  GetGenerationByIdResponse,
  GetGenerationByIdResponseBody,
} from "@leonardo-ai/sdk/sdk/models/operations";
import { SdGenerationStyle } from "@leonardo-ai/sdk/sdk/models/shared";

const apiKey = process.env.LEONARDO_API_KEY!;

const leonardo = new Leonardo({
  bearerAuth: apiKey,
});

export const generateImage = async (prompt: string) => {
  if (!apiKey) {
    console.log("could not find api key");
    return null;
  }

  const leonardoKinoXL = "aa77f04e-3eec-4034-9c07-d0f619684628";
  const leonardoPhoenix = "6b645e3a-d64f-4341-a6d8-7a3690fbf042";

  const result = await leonardo.image.createGeneration({
    // alchemy: true,
    height: 1024,
    width: 1024,
    modelId: "aa77f04e-3eec-4034-9c07-d0f619684628",
    numImages: 1,
    presetStyle: SdGenerationStyle.Cinematic,
    prompt: prompt,
    // photoReal: true,
    promptMagic: false,
  });

  if (result.statusCode !== 200) {
    console.log("failed to initiate image generation");
    return null;
  }

  const job = result.object;

  const generationResponse = await getGenerations(
    job?.sdGenerationJob?.generationId!
  );

  if (generationResponse["data"] === "error") {
    console.log("failed to get generated image.");
    return null;
  }

  const generations = generationResponse[
    "data"
  ] as GetGenerationByIdResponseBody;

  const generatedImages = generations.generationsByPk?.generatedImages;

  if (generatedImages === undefined) {
    console.log("an error occurred while getting generated image");
    return null;
  }

  const generatedImageUrl = generatedImages[0].url;

  if (generatedImageUrl === undefined) {
    console.log("failed to get generated image url");
    return null;
  }

  return generatedImageUrl;
};

export const getGenerations = async (generationId: string) => {
  try {
    if (!apiKey) {
      throw new Error("could not find api key");
    }

    const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;

    const result = await leonardo.image.getGenerationById(generationId);

    if (result.statusCode !== 200) {
      throw new Error("failed to get generated image.");
    }

    let generations = result.object;

    let generatedImages = generations?.generationsByPk?.generatedImages;

    if (generatedImages !== undefined && generatedImages.length === 0) {
      const result = await getGenerations(generationId);

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
