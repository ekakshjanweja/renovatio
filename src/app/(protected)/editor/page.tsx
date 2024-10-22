"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { init } from "./scripts/utils";

function SolaceEditor() {
  const searchParams = useSearchParams();

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0.97 * window.innerWidth,
    height: 0.97 * (window.innerHeight - 90),
  });
  const [isMask, setIsMask] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(
    searchParams.get("image"),
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isMask) document.body.style.cursor = "crosshair";
    if (!isMask) {
      document.body.style.cursor = "default";
    }
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function updateDimensions() {
      setCanvasDimensions({
        width: 0.97 * window.innerWidth,
        height: 0.97 * (window.innerHeight - 90),
      });
    }

    init(canvas, imageURL, isMask);
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [imageURL, isMask]);

  return (
    <>
      <Toolbar isMask={isMask} setIsMask={setIsMask} />
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="bg-[#13161b] rounded-xl border-2 border-[#a7d129]"
          width={canvasDimensions.width}
          height={canvasDimensions.height}
        ></canvas>
      </div>
    </>
  );
}

export default SolaceEditor;
