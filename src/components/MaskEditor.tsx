"use client";
import { useEffect, useRef } from "react";
import { MaskEditorProps } from "@/types/mask-editor";

function MaskEditor({ props }: { props: MaskEditorProps }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // base canvas
  useEffect(() => {
    console.log(props.cursorSize);
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const image = new Image(props.width, props.height);
    image.src = props.image;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, props.width, props.height);
    };
  }, [props]);

  // cursor canvas
  useEffect(() => {
    if (!cursorCanvasRef.current) return;

    const cursorCanvas = cursorCanvasRef.current;
    const cursorCtx = cursorCanvas?.getContext("2d")!;

    const listener = (e: MouseEvent) => {
      cursorCtx.clearRect(0, 0, props.width, props.height);
      cursorCtx.beginPath();
      cursorCtx.arc(e.offsetX, e.offsetY, props.cursorSize, 0, 360);
      cursorCtx.fill();
      cursorCtx.stroke();
    };

    cursorCanvas.addEventListener("mousemove", listener);

    return () => {
      cursorCanvas.removeEventListener("mousemove", listener);
    };
  }, [props]);

  return (
    <div className="relative w-fit">
      <canvas
        ref={canvasRef}
        width={props.width}
        height={props.height}
        className="absolute top-0 left-0 bg-[#13161b] rounded-xl border-2 border-[#a7d129]"
      />
      <canvas
        ref={maskCanvasRef}
        width={props.width}
        height={props.height}
        className="absolute top-0 left-0"
      />
      <canvas
        ref={cursorCanvasRef}
        width={props.width}
        height={props.height}
        className="absolute top-0 left-0 rounded-xl cursor-crosshair"
      />
    </div>
  );
}

export default MaskEditor;
