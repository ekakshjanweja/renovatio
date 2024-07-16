"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReplicateFormSchema } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Prediction } from "replicate";
import { z } from "zod";
import { ShowError } from "./error";
import { ShowPrediction } from "./prediction";
import { Room } from "@/types/interfaces";
import { UploadImageForGenerationComponent } from "../../_components/upload-image-for-generation";
import { CancelButton } from "./cancelPredictionButton";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface MainPrMainSolaceComponentProps {
  room: Room;
}

export const MainSolaceComponent = ({
  room,
}: MainPrMainSolaceComponentProps) => {
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const onSubmit = async (values: z.infer<typeof ReplicateFormSchema>) => {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Prompt: values.prompt,
        image: room.imageForGeneration,
      }),
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed" &&
      prediction.status !== "canceled"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id, {
        cache: "no-store",
      });
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  const form = useForm<z.infer<typeof ReplicateFormSchema>>({
    resolver: zodResolver(ReplicateFormSchema),
    defaultValues: {
      image:
        "https://replicate.delivery/pbxt/KhTNuTIKK1F1tvVl8e7mqOlhR3z3D0SAojAMN8BNftCvAubM/bedroom_3.jpg",
      prompt: "",
    },
  });

  return (
    <>
      <main className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-white dark:bg-black">
        <Card className="w-11/12 sm:w-8/12">
          <CardHeader className="text-center">
            <CardTitle>
              Dream interior design for the house of your dreams...
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ShowPrediction prediction={prediction} room={room} />

            <div className="my-8">
              <UploadImageForGenerationComponent room={room} />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex-col"
              >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Prompt</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="a bohemian themed beach house..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Go!
                </Button>
              </form>
            </Form>

            <CancelButton prediction={prediction} />

            <ShowError error={error} />
          </CardContent>
        </Card>
      </main>
    </>
  );
};
