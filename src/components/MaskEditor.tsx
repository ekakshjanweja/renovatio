"use client";
import { useCallback, useEffect, useRef } from "react";
import { MaskEditorProps } from "@/types/mask-editor";

function MaskEditor({ props }: { props: MaskEditorProps }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  function hexToRGB(color: string) {
    let parts = color.replace("#", "").match(/.{1,2}/g);
    return parts!.map((part) => parseInt(part, 16));
  }

  // Drawing image on base canvas.
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

  // Drawing cursor on base canvas
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

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const cursorCtx = canvasRef.current?.getContext("2d");

      if (cursorCtx) {
        cursorCtx.clearRect(0, 0, props.width, props.height);

        cursorCtx.beginPath();
        cursorCtx.fillStyle = "#23272d88";
        cursorCtx.strokeStyle = "#23272d";
        cursorCtx.arc(event.offsetX, event.offsetY, props.cursorSize, 0, 360);
        cursorCtx.fill();
        cursorCtx.stroke();
      }

      const maskCtx = maskCanvasRef.current?.getContext("2d");

      if (maskCtx && event.buttons > 0) {
        maskCtx.beginPath();
        maskCtx.fillStyle =
          event.buttons > 1 || event.shiftKey ? "#ffffff" : "#23272d";
        maskCtx.arc(event.offsetX, event.offsetY, props.cursorSize, 0, 360);
        maskCtx.fill();
      }
    };
  }, [props]);

  // Drawing canvas
  const replaceMaskColor = useCallback(
    (hexColor: string, invert: boolean) => {
      const maskCtx = maskCanvasRef.current?.getContext("2d");
      const imageData = maskCtx?.getImageData(0, 0, props.width, props.height);
      const color = hexToRGB(hexColor);
      if (imageData) {
        for (var i = 0; i < imageData?.data.length; i += 4) {
          const pixelColor =
            (imageData.data[i] === 255) != invert ? [255, 255, 255] : color;
          imageData.data[i] = pixelColor[0];
          imageData.data[i + 1] = pixelColor[1];
          imageData.data[i + 2] = pixelColor[2];
          imageData.data[i + 3] = imageData.data[i + 3];
        }
        maskCtx?.putImageData(imageData, 0, 0);
      }
    },
    [maskCanvasRef, props],
  );

  useEffect(() => replaceMaskColor("#23272d", false), [replaceMaskColor]);

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
        style={{
          opacity: 0.75,
          mixBlendMode: "normal",
        }}
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
