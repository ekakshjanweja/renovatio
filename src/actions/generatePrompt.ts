"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generatePrompt(imageURL: string) {
  if (!GEMINI_API_KEY) {
    return;
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  /**
    -> This piece of code fetches the image from the imageURL which is the url of the image
    stored in upload thing of format(webp).
    -> When the promise is resolved the fetched image is converted to array of bytes by arrayBuffer()
    -> The array of bytes is converted

  */
  const image = await fetch(imageURL)
    .then(async (res) => await res.arrayBuffer())
    .then((res) => Buffer.from(res).toString("base64"));

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const guessedPrompt = await model.generateContent([
    "You are an AI image prompt writer. Your task is to create a detailed prompt describing the image given. The goal is to ensure that the generated image perfectly replicates the input image.",
    { inlineData: { data: image, mimeType: "image/webp" } },
  ]);

  return guessedPrompt.response.text();
}

export default generatePrompt;
