"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AlertCircle, Loader2 } from "lucide-react";
import { Project } from "@/types/interfaces";
import { cn } from "@/lib/utils";
import { UrlCopy } from "@/components/url-copy";
import { SaveToProjectDialog } from "./save-to-project-dialog";
import { GeneratedImages } from "@leonardo-ai/sdk/sdk/models/operations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leonardo } from "@leonardo-ai/sdk";
import {
  CreateGenerationRequestBody,
  GetGenerationByIdResponseBody,
} from "@leonardo-ai/sdk/sdk/models/operations";
import { SdGenerationStyle } from "@leonardo-ai/sdk/sdk/models/shared";
import { updateUsage } from "@/actions/user-action";
import { saveSolaceHistory } from "@/actions/solace-action";
import { SolaceInsert, Variation } from "@/db/schema/solace";
import { ROOM_TYPE, roomTypeNames } from "@/lib/enums/room_type_enum";
import { STYLE, styleNames } from "@/lib/enums/style_enum";
import { modelEnumSchema } from "@/lib/enums/model_enum";
import { v4 as uuidv4 } from "uuid";
import { MutableRequestCookiesAdapter } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import MaskEditor from "@/components/MaskEditor";
import { Slider } from "@/components/ui/slider";

interface SolaceResultProps {
  prompt: string;
  roomType: ROOM_TYPE;
  numberOfImages: number;
  style: STYLE;
  isEnhanced: boolean;
  apiKey: string;
  projects: Project[];
  userId: string;
  remainingCredits: number;
}

export const SolaceResult = ({
  prompt,
  roomType,
  numberOfImages,
  style,
  isEnhanced,
  apiKey,
  projects,
  userId,
  remainingCredits,
}: SolaceResultProps) => {
  const [generatedImages, setGeneratedImages] = useState<
    GeneratedImages[] | undefined
  >(undefined);

  const [selectedImage, setSelectedImage] = useState<GeneratedImages | null>(
    null,
  );
  const [cursorSize, setCursorSize] = useState<number>(10);

  const [error, setError] = useState<string | null>(null);

  const effectRan = useRef(false);

  useEffect(() => {
    const generateImage = async (
      prompt: string,
      roomType: ROOM_TYPE,
      numberOfImages: number,
      style: STYLE,
      isEnhanced: boolean,
      apiKey: string,
      contextualImageUrl?: string,
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

      const options: CreateGenerationRequestBody = {
        height: 1024,
        width: 1024,
        modelId: leonardoKinoXL,
        numImages: numberOfImages,
        presetStyle: SdGenerationStyle.Cinematic,
        prompt:
          prompt + "; " + roomTypeNames[roomType] + "; " + styleNames[style],
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
        prompt:
          prompt + "; " + roomTypeNames[roomType] + "; " + styleNames[style],
        promptMagic: false,
        alchemy: true,
        photoReal: true,
      };

      if (remainingCredits < 4) {
        return {
          status: "error",
          data: "You have insufficient credits to generate this image.",
        };
      }

      const result = await leonardo.image.createGeneration(
        isEnhanced ? alchemyOptions : options,
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
        leonardo,
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
        id: uuidv4(),
        prompt: prompt,
        coverUrl:
          generatedImages[0].url === undefined ? "" : generatedImages[0].url,
        contextualImageUrl: contextualImageUrl,
        variations: variations,
        model: modelEnumSchema.Values.leonardo_kino_xl,
        numberOfImages: numberOfImages,
        generatedBy: userId,
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
          saveImageToHistory: imageToSaveInHistory,
          usage: 200,
        },
      };
    };

    const getGenerations = async (
      generationId: string,
      apiKey: string,
      leonardo: Leonardo,
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
    if (effectRan.current == false) {
      const startImageGeneration = async () => {
        try {
          const response = await generateImage(
            prompt,
            roomType,
            numberOfImages,
            style,
            isEnhanced,
            apiKey,
          );

          if (response.status === "error") {
            throw new Error(response.data as string);
          }
          const data = response.data as {
            images: GeneratedImages[];
            usage: number;
          };

          const images = data.images as GeneratedImages[];

          setGeneratedImages(images as GeneratedImages[] | undefined);
          setSelectedImage(images[0] as GeneratedImages);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "An error occurred",
          );
        }
      };
      startImageGeneration();
    }

    return () => {
      effectRan.current = true;
    };
  }, [
    apiKey,
    isEnhanced,
    numberOfImages,
    prompt,
    remainingCredits,
    roomType,
    style,
    userId,
  ]);

  if (error) {
    return (
      <div className="flex justify-start relative h-full w-[70vw] items-center transition-all duration-300">
        <Card className="w-full max-w-md bg-destructive text-destructive-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-y-6">
            <p className="text-xl w-full">{error}</p>
            <Button className="mt-6">Get Pro</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (generatedImages === undefined) {
    return (
      <div className="flex justify-center relative  h-full w-[70vw] items-center transition-all duration-300">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full transition-all duration-300">
      {selectedImage !== null && (
        <>
          <div className="flex flex-col lg:flex lg:flex-row items-start justify-center">
            <div className="relative w-[95vw] md:w-[50vw] lg:w-[40vw] aspect-square">
              <Image
                src={selectedImage.url ?? ""}
                alt="uploaded-image"
                fill
                className="rounded-md object-cover"
                sizes="100vw"
              />
            </div>

            <div className="mt-8 lg:mt-0 flex flex-col justify-start items-start relative w-[95vw] lg:w-[40vw] lg:pl-4 overflow-x-auto gap-y-4">
              <p className="text-xl mb-4">Generation Properties</p>
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-sm">Prompt</p>
                <p className="p-4 bg-neutral-200 rounded-xl text-neutral-800 w-full text-lg font-medium">
                  {prompt}
                </p>
              </div>
              <div className="lex flex-col gap-y-2 w-full">
                <p className="text-sm">Image Url</p>
                <UrlCopy url={selectedImage.url ?? ""} />
              </div>
              <div className="flex w-full items-center justify-between gap-x-4">
                <p className="flex items-center justify-center flex-1 py-2 bg-neutral-800 rounded-lg hover:bg-custom transition-all duration-300">
                  {roomType}
                </p>
                <p className="flex items-center justify-center flex-1 py-2 bg-neutral-800 rounded-lg hover:bg-custom transition-all duration-300">
                  {style}
                </p>
              </div>
              <div className="flex w-full items-center gap-x-4">
                {isEnhanced && (
                  <p className="border-custom border-2 px-4 py-2 text-sm rounded-full bg-neutral-900 hover:bg-neutral-700 font-medium transition-all duration-300">
                    Enhanced
                  </p>
                )}
                <SaveToProjectDialog
                  projects={projects}
                  imageUrl={selectedImage.url ?? ""}
                />
              </div>
              <div>Mask Editor</div>
              <div className="flex justify-center items-center w-[300px]">
                Cursor Size:
                <Slider
                  className="w-[60%]"
                  min={5}
                  max={30}
                  step={3}
                  value={[cursorSize]}
                  onValueChange={(value) => setCursorSize(value[0])}
                />
              </div>
              <MaskEditor
                props={{
                  height: 300,
                  width: 300,
                  image: selectedImage.url as string,
                  cursorSize: cursorSize,
                }}
              />
            </div>
          </div>
        </>
      )}

      {generatedImages !== undefined && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 mx-auto w-full overflow-x-auto my-4 gap-4 lg:gap-0">
            {generatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-[45vw] md:w-[20vw] lg:w-[10vw] aspect-square">
                  <Image
                    src={image.url ?? ""}
                    alt={`generated-image-${index}`}
                    fill
                    className={cn(
                      "rounded-md object-cover transition-all duration-300",
                      selectedImage === image
                        ? "border-2 border-custom"
                        : "opacity-50",
                    )}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
