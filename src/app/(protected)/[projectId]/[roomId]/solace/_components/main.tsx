"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ReplicateFormSchema } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Room } from "@/types/interfaces";
import { UploadImageForGenerationComponent } from "../../_components/upload-image-for-generation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useState } from "react";
import { SdGenerationStyle } from "@leonardo-ai/sdk/sdk/models/shared";
import { GetGenerationByIdResponseBody } from "@leonardo-ai/sdk/sdk/models/operations";
import { Leonardo } from "@leonardo-ai/sdk";
import { boolean } from "drizzle-orm/mysql-core";
import { SolaceResultComponent } from "./result";

export const MainSolaceComponent = ({
  room,
  apiKey,
}: {
  room: Room;
  apiKey: string;
}) => {
  const [showResult, setShowResult] = useState<string | null>(null);

  const onSubmit = (values: z.infer<typeof ReplicateFormSchema>) => {
    setShowResult(values.prompt);
  };

  const form = useForm<z.infer<typeof ReplicateFormSchema>>({
    resolver: zodResolver(ReplicateFormSchema),
    defaultValues: {
      prompt: "",
      Image:
        room.imageForGeneration ||
        "https://replicate.delivery/pbxt/KhTNuTIKK1F1tvVl8e7mqOlhR3z3D0SAojAMN8BNftCvAubM/bedroom_3.jpg",
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
            {showResult !== null && (
              <SolaceResultComponent prompt={showResult} apiKey={apiKey} />
            )}

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

                <ImageUploadAccordion room={room} />

                <Button type="submit" className="w-full">
                  Go!
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

const ImageUploadAccordion = ({ room }: { room: Room }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <FormLabel>Upload Image</FormLabel>
        </AccordionTrigger>
        <AccordionContent className="m-2">
          <UploadImageForGenerationComponent room={room} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
