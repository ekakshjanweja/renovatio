"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const SolaceTab = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [roomType, setRoomType] = useState("living-room");
  const [numberOfImages, setNumberOfImages] = useState("1");
  const [style, setStyle] = useState("modern");

  return (
    <>
      <div className="p-0 mt-4">
        <h1 className="text-2xl pb-2 font-semibold">Solace</h1>
        <p className="pb-4">Generate mockups super fast.</p>
        <div className="space-y-6 my-6">
          <p className="text-lg font-medium">Design Prompt</p>
          <Input
            id="prompt"
            placeholder="Describe your interior design idea....."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-12">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Images</label>
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
            <Tabs value={style} onValueChange={setStyle} className="w-full">
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
              <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger value="living-room" className="py-2">
                  Living Room
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
    </>
  );
};
