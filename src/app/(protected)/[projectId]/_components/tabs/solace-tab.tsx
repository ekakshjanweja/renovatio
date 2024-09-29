"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leonardo } from "@leonardo-ai/sdk";
import { CreateGenerationRequestBody, GeneratedImages } from "@leonardo-ai/sdk/sdk/models/operations";
import { SdGenerationStyle } from "@leonardo-ai/sdk/sdk/models/shared";
import { Download, Loader2, RefreshCw, Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SolaceTab() {
  const [prompt, setPrompt] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("living-room");
  const [style, setStyle] = useState<string>("modern");
  const [numberOfImages, setNumberOfImages] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages[]>([]);

  const handleGenerateImages = async () => {
    const leonardo = new Leonardo({
      bearerAuth: process.env.LEONARDO_API_KEY!,
    });

    const leonardoKinoXL = "aa77f04e-3eec-4034-9c07-d0f619684628";
    const leonardoPhoenix = "6b645e3a-d64f-4341-a6d8-7a3690fbf042";

    // handle "enhance with additional details"
    const options: CreateGenerationRequestBody = {
      height: 1024,
      width: 1024,
      modelId: leonardoKinoXL,
      numImages: 2,
      presetStyle: SdGenerationStyle.Cinematic,
      prompt: prompt,
      promptMagic: false,
      alchemy: false,
      photoReal: false,
    };
    // generationId: "cb9fe68b-da78-4b00-86dd-3d6102dffa2a"

    const generationID = await leonardo.image.createGeneration(options);

    if (generationID.statusCode !== 200) {
      console.log("failed to initiate image generation");
      return null;
    }

    const images = await leonardo.image.getGenerationById(
      generationID.object?.sdGenerationJob?.generationId as string,
    );

    if (images.statusCode !== 200) {
      throw new Error("failed to get generated image.");
    }

    let generations = images.object?.generationsByPk?.generatedImages;
    console.log(generations);
    setGeneratedImages(generations!);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-7xl">Solace</CardTitle>
        <CardDescription>
          Create stunning interior designs with AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Design Prompt
            </label>
            <Input
              id="prompt"
              placeholder="Describe your interior design idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Images</label>
              <Tabs
                value={numberOfImages}
                onValueChange={setNumberOfImages}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger value="1">1</TabsTrigger>
                  <TabsTrigger value="3">3</TabsTrigger>
                  <TabsTrigger value="2">2</TabsTrigger>
                  <TabsTrigger value="4">4</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Style</label>
              <Tabs value={style} onValueChange={setStyle} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger value="modern">Modern</TabsTrigger>
                  <TabsTrigger value="traditional">Traditional</TabsTrigger>
                  <TabsTrigger value="minimalist">Minimalist</TabsTrigger>
                  <TabsTrigger value="eclectic">Eclectic</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Room Type</label>
              <Tabs
                value={roomType}
                onValueChange={setRoomType}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger value="living-room">Living Room</TabsTrigger>
                  <TabsTrigger value="bedroom">Bedroom</TabsTrigger>
                  <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                  <TabsTrigger value="bathroom">Bathroom</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="enhance" />
            <label htmlFor="enhance" className="text-sm font-medium">
              Enhance with additional details
            </label>
          </div>
          <Button
            onClick={handleGenerateImages}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Images"
            )}
          </Button>
        </div>
      </CardContent>
      {generatedImages.length > 0 && (
        <CardFooter>
          <div className="space-y-4 w-full">
            <h3 className="text-lg font-semibold">Generated Designs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {generatedImages.map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image alt="Image" src="" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                        <div className="flex space-x-2">
                          <Button size="icon" variant="secondary">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        I aII
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate More Variations
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
