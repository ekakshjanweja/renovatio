"use client";
import { useCallback, useEffect, useRef } from "react";
import { MaskEditorProps } from "@/types/mask-editor";

function MaskEditor({ props }: { props: MaskEditorProps }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Drawing image on base canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const image = new Image();
    image.src = props.image;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, props.width, props.height);
    };
  }, [props]);

  // Initialize mask canvas with transparent background
  useEffect(() => {
    if (!maskCanvasRef.current) return;
    const maskCtx = maskCanvasRef.current.getContext("2d")!;
    maskCtx.clearRect(0, 0, props.width, props.height);
    maskCtx.fillStyle = "rgba(0, 0, 0, 0)";
    maskCtx.fillRect(0, 0, props.width, props.height);
  }, [props.width, props.height]);

  // Drawing cursor
  const drawCursor = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.clearRect(0, 0, props.width, props.height);
      ctx.beginPath();
      ctx.strokeStyle = "#23272d";
      ctx.lineWidth = 1.5;
      ctx.arc(x, y, props.cursorSize, 0, Math.PI * 2);
      ctx.stroke();
    },
    [props.width, props.height, props.cursorSize],
  );

  // Handle cursor visibility and movement
  useEffect(() => {
    if (!cursorCanvasRef.current) return;

    const cursorCanvas = cursorCanvasRef.current;
    const cursorCtx = cursorCanvas.getContext("2d")!;
    const parentDiv = cursorCanvas.parentElement;

    if (!parentDiv) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cursorCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawCursor(cursorCtx, x, y);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = cursorCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawCursor(cursorCtx, x, y);
    };

    const handleMouseLeave = () => {
      cursorCtx.clearRect(0, 0, props.width, props.height);
    };

    parentDiv.addEventListener("mousemove", handleMouseMove);
    parentDiv.addEventListener("mouseenter", handleMouseEnter);
    parentDiv.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parentDiv.removeEventListener("mousemove", handleMouseMove);
      parentDiv.removeEventListener("mouseenter", handleMouseEnter);
      parentDiv.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [props.width, props.height, drawCursor]);

  // Drawing mask
  useEffect(() => {
    if (!maskCanvasRef.current) return;

    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true })!;

    let isDrawing = false;

    const draw = (e: MouseEvent) => {
      if (!isDrawing && e.type !== "mousedown") return;

      maskCtx.beginPath();
      maskCtx.fillStyle =
        e.buttons === 2 || e.shiftKey
          ? "rgba(0, 0, 0, 0)"
          : "rgba(0, 0, 0, 0.7)";
      maskCtx.globalCompositeOperation =
        e.buttons === 2 || e.shiftKey ? "destination-out" : "source-over";
      maskCtx.arc(e.offsetX, e.offsetY, props.cursorSize, 0, Math.PI * 2);
      maskCtx.fill();
    };

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true;
      draw(e);
    };

    const stopDrawing = () => {
      isDrawing = false;
      maskCtx.globalCompositeOperation = "source-over";
    };

    maskCanvas.addEventListener("mousedown", startDrawing);
    maskCanvas.addEventListener("mousemove", draw);
    maskCanvas.addEventListener("mouseup", stopDrawing);
    maskCanvas.addEventListener("mouseout", stopDrawing);
    maskCanvas.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      maskCanvas.removeEventListener("mousedown", startDrawing);
      maskCanvas.removeEventListener("mousemove", draw);
      maskCanvas.removeEventListener("mouseup", stopDrawing);
      maskCanvas.removeEventListener("mouseout", stopDrawing);
      maskCanvas.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, [props.cursorSize]);

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
        className="absolute top-0 left-0 pointer-events-auto"
        id="mask-canvas"
        style={{
          opacity: 0.75,
          mixBlendMode: "normal",
        }}
      />
      <canvas
        ref={cursorCanvasRef}
        width={props.width}
        height={props.height}
        className="absolute top-0 left-0 rounded-xl cursor-crosshair pointer-events-none"
      />
    </div>
  );
}

export default MaskEditor;
