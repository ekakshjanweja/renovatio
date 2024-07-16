import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const { predictionID } = await req.json();

  const cancel = await replicate.predictions.cancel(predictionID);

  if (cancel?.error) {
    return NextResponse.json({ detail: cancel.error.detail }, { status: 500 });
  }

  return NextResponse.json(
    { message: "prediction successfully canceled" },
    { status: 200 },
  );
}
