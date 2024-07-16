import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// const parseImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   // parses image into blob string once input is filled in
//   if (e.target.files == null) return;
//   const fileList = Array.from(e.target.files);
//   if (fileList) {
//     const file = fileList[0];
//     const blob = new Blob([file], { type: "image/*" });
//     const blobStr: string = await blobToBase64(blob);
//     setImageStr(blobStr);
//   }
// };

export async function POST(req: Request) {
  const { Prompt, image } = await req.json();

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("The REPLICATE_API_TOKEN environment variable is not set.");
  }

  const prediction = await replicate.predictions.create({
    version: "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
    input: {
      image: image,
      // ??
      //"https://replicate.delivery/pbxt/KhTNuTIKK1F1tvVl8e7mqOlhR3z3D0SAojAMN`8BNftCvAubM/bedroom_3.jpg",
      prompt: Prompt,
    },
  });

  if (prediction?.error) {
    return NextResponse.json(
      { detail: prediction.error.detail },
      { status: 500 },
    );
  }

  return NextResponse.json(prediction, { status: 201 });
}
