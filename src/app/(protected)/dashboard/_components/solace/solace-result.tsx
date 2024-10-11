"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Project } from "@/types/interfaces";
import { cn } from "@/lib/utils";
import { UrlCopy } from "@/components/url-copy";
import { generateImage } from "@/actions/solace-generation-action";
import { SaveToProjectDialog } from "./save-to-project-dialog";
import { GeneratedImages } from "@leonardo-ai/sdk/sdk/models/operations";

interface SolaceResultProps {
  prompt: string;
  roomType: string;
  numberOfImages: number;
  style: string;
  isEnhanced: boolean;
  apiKey: string;
  projects: Project[];
}

export const SolaceResult = ({
  prompt,
  roomType,
  numberOfImages,
  style,
  isEnhanced,
  apiKey,
  projects,
}: SolaceResultProps) => {
  const [generatedImages, setGeneratedImages] = useState<
    GeneratedImages[] | undefined
  >(undefined);

  const [selectedImage, setSelectedImage] = useState<GeneratedImages | null>(
    null
  );

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current == false) {
      const startImageGeneration = async () => {
        const response = await generateImage(
          prompt,
          roomType,
          numberOfImages,
          style,
          isEnhanced,
          apiKey
        );

        setGeneratedImages(response as GeneratedImages[] | undefined);
        if (response !== undefined) {
          setSelectedImage(response.data.generatedImages[0] as GeneratedImages);
        }
      };

      startImageGeneration();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  if (generatedImages === undefined) {
    return (
      <div className="flex justify-center relative aspect-square w-[20vw] items-center transition-all duration-300">
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
                        : "opacity-50"
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
