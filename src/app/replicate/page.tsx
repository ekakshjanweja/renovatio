"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReplicateFormSchema } from "@/types/zod-schema";
import { Button } from "@/components/ui/button";
import { Prediction } from "replicate";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/services/user-service";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ShowPrediction } from "./_components/prediction";
import { ShowError } from "./_components/error";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(null);

  // const session = await auth();
  //
  // if (!session) {
  //   notFound();
  // }
  //
  // const user = await getCurrentUser();
  //
  // if (user.id !== process.env.CYTO_USER_ID! || user.id !== process.env.STORMEJ_USER_ID! || user.id !== process.env.TARZI_USER_ID) {
  //   notFound()
  // }
  //
  const onSubmit = async (values: z.infer<typeof ReplicateFormSchema>) => {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Prompt: values.prompt }),
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id, { cache: 'no-store' });
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction })
      setPrediction(prediction);
    }
  };

  const form = useForm<z.infer<typeof ReplicateFormSchema>>({
    resolver: zodResolver(ReplicateFormSchema),
    defaultValues: {
      prompt: "",
    }
  })

  return (
    <main className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-black">
      <Card className="w-11/12 sm:w-8/12">
        <CardHeader className="text-center">
          <CardTitle>Dream interior design for the house of your dreams...</CardTitle>
        </CardHeader>

        <CardContent>
          <ShowPrediction prediction={prediction} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-col">

              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Prompt</FormLabel>

                    <FormControl>
                      <Input placeholder="a bohemian themed beach house..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )} />

              <Button type="submit" className="w-full">Go!</Button>
            </form>
          </Form>

          <ShowError error={error} />
        </CardContent>
      </Card>

    </main >
  )
}
