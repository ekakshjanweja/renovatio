import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const { Prompt, image } = await req.json();

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error("The REPLICATE_API_TOKEN environment variable is not set.");
  }

  const prediction = await replicate.predictions.create({
    version: "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
    input: {
      image: image,
      prompt: Prompt,
    },
  });

  if (prediction?.error) {
    return new Response(JSON.stringify({ detail: prediction.error.detail }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(prediction), { status: 201 });
}
