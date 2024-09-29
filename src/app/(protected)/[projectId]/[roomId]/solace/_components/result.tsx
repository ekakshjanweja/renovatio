"use client";

import { Leonardo } from "@leonardo-ai/sdk";
import {
  CreateGenerationRequestBody,
  GetGenerationByIdResponseBody,
} from "@leonardo-ai/sdk/sdk/models/operations";
import { SdGenerationStyle } from "@leonardo-ai/sdk/sdk/models/shared";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { updateRoom } from "@/actions/room-action";
import { Loader2 } from "lucide-react";

interface SolaceResultComponentProps {
  prompt: string;
  apiKey: string;
  betterImages: boolean;
  roomId: string;
}

export const SolaceResultComponent = ({
  prompt,
  apiKey,
  betterImages,
  roomId,
}: SolaceResultComponentProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    const startImageGeneration = async () => {
      const leonardo = new Leonardo({
        bearerAuth: apiKey,
      });

      const generateImage = async (prompt: string) => {
        if (!apiKey) {
          console.log("could not find api key");
          return null;
        }

        const leonardoKinoXL = "aa77f04e-3eec-4034-9c07-d0f619684628";
        const leonardoPhoenix = "6b645e3a-d64f-4341-a6d8-7a3690fbf042";

        const options: CreateGenerationRequestBody = {
          height: 1024,
          width: 1024,
          modelId: leonardoKinoXL,
          numImages: 1,
          presetStyle: SdGenerationStyle.Cinematic,
          prompt: prompt,
          promptMagic: false,
          alchemy: false,
          photoReal: false,
        };

        const alchemyOptions: CreateGenerationRequestBody = {
          height: 1024,
          width: 1024,
          numImages: 1,
          modelId: null,
          presetStyle: SdGenerationStyle.Cinematic,
          prompt: prompt,
          promptMagic: false,
          alchemy: true,
          photoReal: true,
        };

        const result = await leonardo.image.createGeneration(
          betterImages ? alchemyOptions : options
        );

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

      const getGenerations = async (generationId: string) => {
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

      const response = await generateImage(prompt);

      setGeneratedImage(response);
    };

    startImageGeneration();
  }, []);

  return (
    <>
      <div>
        {generatedImage !== null ? (
          <div className="flex flex-col items-center justify-center gap-y-4">
            <Image
              src={generatedImage}
              width={400}
              height={400}
              alt="uploaded-image"
            />
            <Button
              className="rounded-full bg-custom hover:bg-custom"
              onClick={() => updateRoom(roomId, [generatedImage], null, null)}
            >
              Save to project
            </Button>
          </div>
        ) : (
          <div>
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        )}
      </div>
    </>
  );
};
