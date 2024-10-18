"use client";

import { useEffect, useRef, useState } from "react";
import draw from "./scripts/main";

function SolaceEditor() {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvasSize({
      width: 0.95 * window.innerWidth,
      height: 0.95 * (window.innerHeight - 44),
    });
    draw(canvas!);
  }, []);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="bg-[#13161b] rounded-xl m-2"
      ></canvas>
    </div>
  );
}

export default SolaceEditor;
