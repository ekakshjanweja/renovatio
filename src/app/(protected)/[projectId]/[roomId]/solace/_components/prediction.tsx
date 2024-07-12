import { Label } from "@/components/ui/label";
import Image from "next/image"
import { Prediction } from "replicate";

export function ShowPrediction({ prediction }: { prediction: Prediction | null }) {
  return (
    <>
      {prediction && (
        <>
          {prediction.output && (
            <div className="image-wrapper mt-5 flex justify-center rounded-md gap-8">

              <div>
                <Image
                  id="input-image"
                  className="rounded-md shadow-white"
                  src="https://replicate.delivery/pbxt/KhTNuTIKK1F1tvVl8e7mqOlhR3z3D0SAojAMN8BNftCvAubM/bedroom_3.jpg"
                  alt="bedroom"
                  sizes="100vw"
                  height={400}
                  width={400}
                />
                <Label className="flex justify-center py-4" htmlFor="input-image">Input Image</Label>
              </div>

              <div>
                <Image
                  id="output-image"
                  className="rounded-md"
                  src={prediction.output}
                  alt="output"
                  sizes="100vw"
                  height={400}
                  width={400}
                />
                <Label className="flex justify-center py-4" htmlFor="input-image">Output Image</Label>
              </div>

            </div>
          )}
          <p className="py-3 text-sm opacity-50 flex justify-center">status: {prediction.status}</p>
        </>
      )}
    </>
  )
}
