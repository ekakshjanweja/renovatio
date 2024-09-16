"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
    The function fetches the image from uploadthing, converts it into array of bytes using arrayBuffer() method, then converts the array into utf-8 format using Buffer.from() and finally the array of bytes is encoded into base64 string.

    @async
    @param {string} imageURL - Uploadthing URL of the webp image.
    @returns {string}  base64 encoded string binary of the image.
*/
async function getImage(imageURL: string) {
  return await fetch(imageURL)
    .then(async (res) => await res.arrayBuffer())
    .then((res) => Buffer.from(res).toString("base64"));
}

async function generatePrompt(imageURL: string) {
  if (!GEMINI_API_KEY) {
    return;
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const image = await getImage(imageURL);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are an AI image prompt writer. Your task is to create a detailed prompt describing the image given. The goal is to ensure that the generated image perfectly replicates the input image.",
  });

  const guessedPrompt = await model.generateContent([
    { inlineData: { data: image, mimeType: "image/webp" } },
  ]);

  return guessedPrompt.response.text();
}

export default generatePrompt;
