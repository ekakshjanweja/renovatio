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
import {
  ROOM_TYPE,
  roomTypeEnumSchema,
  roomTypeNames,
} from "@/lib/enums/room_type_enum";
import { STYLE, styleEnumSchema, styleNames } from "@/lib/enums/style_enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export const SolaceTab = ({
  apiKey,
  projects,
}: {
  apiKey: string;
  projects: Project[];
}) => {
  const [prompt, setPrompt] = useState<string>("");
  const [roomType, setRoomType] = useState<ROOM_TYPE>(
    roomTypeEnumSchema.Values.living_room
  );
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [style, setStyle] = useState<STYLE>(styleEnumSchema.Values.modern);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerateImages = () => {
    setShowResult(true);
  };

  return (
    <>
      <Card className="max-w-7xl w-[70vw]">
        <CardHeader>
          <CardTitle>Solace</CardTitle>
          <CardDescription>Generate mockups super fast.</CardDescription>
        </CardHeader>

        {showResult && (
          <CardContent className="w-full">
            <SolaceResult
              apiKey={apiKey}
              isEnhanced={isEnhanced}
              prompt={prompt}
              roomType={roomType}
              numberOfImages={numberOfImages}
              style={style}
              projects={projects}
            />
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

              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-4">
                <div className="space-y-2 col-span-2 px-4">
                  <label className="text-sm font-medium">
                    Number of Images
                  </label>
                  <Slider
                    id="image-count"
                    min={1}
                    max={5}
                    step={1}
                    value={[numberOfImages]}
                    onValueChange={(value) => setNumberOfImages(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                  {/* <Tabs
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
                  </Tabs> */}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Style</label>
                  <Select
                    value={style}
                    onValueChange={(value) => setStyle(value as STYLE)}
                  >
                    <SelectTrigger id="style" className="w-full">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(styleEnumSchema.Values).map(
                        ([key, value]) => (
                          <SelectItem key={value} value={value}>
                            {styleNames[value]}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Room Type</label>
                  <Select
                    value={roomType}
                    onValueChange={(value) => setRoomType(value as ROOM_TYPE)}
                  >
                    <SelectTrigger id="room-type" className="w-full">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roomTypeEnumSchema.Values).map(
                        ([key, value]) => (
                          <SelectItem key={value} value={value}>
                            {roomTypeNames[value]}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
                disabled={!prompt}
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
