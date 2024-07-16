import { Prediction } from "replicate";
import { Button } from "@/components/ui/button";

export const CancelButton = ({
  prediction,
}: {
  prediction: Prediction | null;
}) => {
  const handleClick = async () => {
    const response = await fetch("/api/predictions/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ predictionID: prediction?.id }),
    });
    console.log(await response.json());
  };

  // returns the cancel button to display only if, prediction is not generated
  // and is in processing status
  if (prediction?.status == "processing") {
    return (
      <Button
        className="bg-red-400 hover:bg-red-600 my-2 w-full"
        onClick={handleClick}
      >
        Cancel Prediction
      </Button>
    );
  }
};
