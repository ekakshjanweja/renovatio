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
    // stable diffusion model
    // version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
    // adirik/interior-design model
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
