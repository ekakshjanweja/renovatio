"use client";
import MaskEditor from "@/components/MaskEditor";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

function SolaceEditor() {
  // size of cursor in pixels
  const [cursorSize, setCursorSize] = useState<number>(10);

  return (
    <>
      <div className="flex justify-center items-center pt-4">
        <MaskEditor
          props={{
            height: 400,
            width: 400,
            image:
              "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/e2551212-4781-497a-a438-f413b1b432b6/Default_A_minimal_Grey_themed_villa_facade_asthetic_nature_min_0.jpg",
            cursorSize: cursorSize,
          }}
        />
      </div>

      <div className="flex justify-center items-center w-[300px]">
        <Slider
          className="w-[60%]"
          min={5}
          max={30}
          step={3}
          value={[cursorSize]}
          onValueChange={(value) => setCursorSize(value[0])}
        />
      </div>
    </>
  );
}

export default SolaceEditor;
