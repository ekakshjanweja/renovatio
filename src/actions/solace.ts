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

  // const url = "https://cloud.leonardo.ai/api/rest/v1/generations";

  const leonardoKinoXL = "aa77f04e-3eec-4034-9c07-d0f619684628";
  const leonardoPhoenix = "6b645e3a-d64f-4341-a6d8-7a3690fbf042";

  // const options = {
  //   method: "POST",
  //   headers: {
  //     accept: "application/json",
  //     "content-type": "application/json",
  //     authorization: `Bearer 45c614de-891d-497b-a952-818c84b97d87`,
  //   },
  //   body: JSON.stringify({
  //     alchemy: true,
  //     height: 1024,
  //     width: 1024,
  //     modelId: leonardoKinoXL,
  //     num_images: 1,
  //     presetStyle: "CINEMATIC",
  //     prompt: prompt,
  //     photoReal: true,
  //     promptMagic: false,
  //   }),
  // };

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

  // const response = await fetch(url, options);

  // if (!response.ok) {
  //   console.log(response);

  //   console.log("Failed to initiate image generation.");
  //   return null;
  // }

  // const data = await response.json();

  // const job: ImageGenerationJob = data["sdGenerationJob"];

  // const generationResponse = await getGenerations(job.generationId);

  if (generationResponse["data"] === "error") {
    console.log("failed to get generated image.");
    return null;
  }

  const generations = generationResponse[
    "data"
  ] as GetGenerationByIdResponseBody;

  // if (generations === undefined) {
  //   console.log("Failed to get generated image.");
  //   return null;
  // }

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

    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     authorization: `Bearer ${apiKey}`,
    //   },
    // };

    // const response = await fetch(url, options);

    // if (!response.ok) {
    //   throw new Error("Failed to get generated image.");
    // }

    // const data = await response.json();

    // let generations: Generations = data["generations_by_pk"];

    // //TODO: BAD Implementation -> try with a webhook
    // //Kindda Like Polling

    // if (generations.generated_images.length === 0) {
    //   const result = await getGenerations(generationId);

    //   if (result["status"] === "error") {
    //     throw result["data"];
    //   }

    //   generations = result["data"] as Generations;
    // }

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
