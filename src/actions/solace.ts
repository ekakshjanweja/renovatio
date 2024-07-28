"use server";

import { GenerateImageButton } from "@/app/(protected)/[projectId]/_components/generate-image-button";
import { Generations, ImageGenerationJob } from "@/types/interfaces";
import { NextResponse } from "next/server";

const apiKey = process.env.LEONARDO_API_KEY!;

export const generateImage = async () => {
  try {
    if (!apiKey) {
      throw new Error("could not find api key");
    }

    const url = "https://cloud.leonardo.ai/api/rest/v1/generations";

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer  ${apiKey}`,
      },
      body: JSON.stringify({
        alchemy: false,
        height: 256,
        width: 256,
        modelId: "aa77f04e-3eec-4034-9c07-d0f619684628",
        num_images: 1,
        presetStyle: "CINEMATIC",
        prompt: "A majestic cat in the snow",
        photoReal: false,
        promptMagic: false,
      }),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to initiate image generation.");
    }

    const data = await response.json();

    const job: ImageGenerationJob = data["sdGenerationJob"];

    //TODO: Get Generated Image

    const generationResponse: NextResponse = await getGenerations(
      job.generationId
    );

    const generations: Generations = await generationResponse.json();

    const generatedImageUrl = generations.generated_images[0].url;

    console.log(GenerateImageButton);

    return NextResponse.json({
      status: "success",
      data: generatedImageUrl,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: error,
    });
  }
};

export const getGenerations = async (generationId: string) => {
  try {
    if (!apiKey) {
      throw new Error("could not find api key");
    }

    const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generateImage}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer  ${apiKey}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to get generated image.");
    }

    const data = await response.json();

    const generations: Generations = data["generations_by_pk"];

    return NextResponse.json({
      status: "success",
      data: generations,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: error,
    });
  }
};

// export const generateImage = async () => {
//   //   const url = "https://cloud.leonardo.ai/api/rest/v1/generations";
//   //   const headers = {
//   //     "Content-Type": "application/json",
//   //     accept: "application/json",
//   //     authorization: `Bearer ${process.env.LEONARDO_API_KEY!}`,
//   //   };

//   //   const response = await fetch(url, {
//   //     method: "POST",
//   //     headers,
//   //     body: JSON.stringify({
//   //       height: 512,
//   //       prompt: "A cat staring at a window",
//   //       width: 512,
//   //       presetStyle: "CINEMATIC",
//   //     }),
//   //   });

//   const generatedImg = "a77eb69a-926d-4bfe-bd65-d02dcb6614d2";

//   const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generatedImg}`;

//   const headers = {
//     "Content-Type": "application/json",
//     accept: "application/json",
//     authorization: `Bearer ${process.env.LEONARDO_API_KEY!}`,
//   };

//   const response = await fetch(url, {
//     method: "GET",
//     headers,
//   });

//   const data = await response.json();

//   const image = data["generations_by_pk"]["generated_images"][0]["url"];

//   console.log(image);

//   return image;
// };
