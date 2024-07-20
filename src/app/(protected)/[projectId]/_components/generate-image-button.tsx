"use client";

import { generateImage } from "@/actions/solace";
import { Button } from "@/components/ui/button";

export const GenerateImageButton = () => {
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => {
          generateImage();
        }}
      >
        Solace
      </Button>
    </>
  );
};
