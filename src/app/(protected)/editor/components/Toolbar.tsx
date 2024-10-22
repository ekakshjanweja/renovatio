import { Hand, Crop, VenetianMask, Play } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { SetStateAction } from "react";
export function Toolbar({
  isMask,
  setIsMask,
}: {
  isMask: boolean;
  setIsMask: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex justify-center p-[5px]">
      <ToggleGroup
        type="single"
        className="border border-[#a7d129] rounded-md p-1 flex gap-1"
        size={"sm"}
      >
        <ToggleGroupItem value="hand" disabled={true}>
          <Hand />
        </ToggleGroupItem>
        <ToggleGroupItem value="crop" disabled={true}>
          <Crop />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="mask"
          onClick={() => {
            setIsMask(!isMask);
          }}
        >
          <VenetianMask /> Mask
        </ToggleGroupItem>
        <ToggleGroupItem
          value="mask"
          className="bg-green-500 hover:bg-green-900"
        >
          <Play />
          Run
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
