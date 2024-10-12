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
import { useState } from "react";
import { SolaceResult } from "./solace-result";
import { Project } from "@/types/interfaces";

export const SolaceTab = ({
  apiKey,
  projects,
}: {
  apiKey: string;
  projects: Project[];
}) => {
  const [prompt, setPrompt] = useState<string>("");
  const [roomType, setRoomType] = useState("living-room");
  const [numberOfImages, setNumberOfImages] = useState("1");
  const [style, setStyle] = useState("modern");
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerateImages = () => {
    setShowResult(true);
  };

  return (
    <>
      <Card className="max-w-7xl">
        <CardHeader>
          <CardTitle>Solace</CardTitle>
          <CardDescription>Generate mockups super fast.</CardDescription>
        </CardHeader>

        {showResult && (
          <CardContent className="w-full">
            {/* <SolaceResult
              apiKey={apiKey}
              isEnhanced={isEnhanced}
              prompt={prompt}
              roomType={roomType}
              numberOfImages={parseInt(numberOfImages)}
              style={style}
              projects={projects}
            /> */}
          </CardContent>
        )}

        {!showResult && (
          <>
            <CardContent>
              <p className="text-lg font-medium">Design Prompt</p>
              <Input
                id="prompt"
                placeholder="Describe your interior design idea....."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <div className="flex w-full">
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Number of Images
                    </label>
                    <Tabs
                      value={numberOfImages}
                      onValueChange={setNumberOfImages}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2 h-auto">
                        <TabsTrigger value="1" className="py-2">
                          1
                        </TabsTrigger>
                        <TabsTrigger value="3" className="py-2">
                          3
                        </TabsTrigger>
                        <TabsTrigger value="2" className="py-2">
                          2
                        </TabsTrigger>
                        <TabsTrigger value="4" className="py-2">
                          4
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style</label>
                    <Tabs
                      value={style}
                      onValueChange={setStyle}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2 h-auto">
                        <TabsTrigger value="modern" className="py-2">
                          Modern
                        </TabsTrigger>
                        <TabsTrigger value="traditional" className="py-2">
                          Traditional
                        </TabsTrigger>
                        <TabsTrigger value="minimalist" className="py-2">
                          Minimalist
                        </TabsTrigger>
                        <TabsTrigger value="eclectic" className="py-2">
                          Eclectic
                        </TabsTrigger>
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
                      <TabsList className="grid w-full grid-cols-3 h-auto">
                        <TabsTrigger value="living-room" className="py-2">
                          Living Room
                        </TabsTrigger>
                        <TabsTrigger value="exterior" className="py-2">
                          Exterior
                        </TabsTrigger>
                        <TabsTrigger value="bedroom">Bedroom</TabsTrigger>
                        <TabsTrigger value="kitchen" className="py-2">
                          Kitchen
                        </TabsTrigger>
                        <TabsTrigger value="bathroom" className="py-2">
                          Bathroom
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <Switch
                  id="enhance"
                  checked={isEnhanced}
                  onCheckedChange={setIsEnhanced}
                />
                <label htmlFor="enhance" className="text-sm font-medium">
                  Enhance Images
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full border-custom border-2 rounded-full"
                variant={"outline"}
                onClick={handleGenerateImages}
              >
                Generate Images
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
};
