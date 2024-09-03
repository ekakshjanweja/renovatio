"use client";
import generatePrompt from "@/actions/generatePrompt";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Switch } from "@/components/ui/switch";
import { Room } from "@/types/interfaces";
import { ReplicateFormSchema } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UploadImageForGenerationComponent } from "../../_components/upload-image-for-generation";
import { SolaceResultComponent } from "./result";

export const MainSolaceComponent = ({
  room,
  apiKey,
}: {
  room: Room;
  apiKey: string;
}) => {
  const [showResult, setShowResult] = useState<string | null>(null);
  const [setshowBetterImages, setSetshowBetterImages] =
    useState<boolean>(false);

  const onSubmit = (values: z.infer<typeof ReplicateFormSchema>) => {
    setSetshowBetterImages(values.betterImages);
    setShowResult(values.prompt);
  };

  const form = useForm<z.infer<typeof ReplicateFormSchema>>({
    resolver: zodResolver(ReplicateFormSchema),
    defaultValues: {
      prompt: "",
      Image:
        room.imageForGeneration ||
        "https://replicate.delivery/pbxt/KhTNuTIKK1F1tvVl8e7mqOlhR3z3D0SAojAMN8BNftCvAubM/bedroom_3.jpg",
      betterImages: false,
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
              <SolaceResultComponent
                prompt={showResult}
                apiKey={apiKey}
                betterImages={setshowBetterImages}
              />
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

                <FormField
                  control={form.control}
                  name="betterImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center justify-between py-4">
                          <p>Generate Better Images</p>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
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
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!room.imageForGeneration) {
      return;
    }

    const guessedPrompt = await generatePrompt(room.imageForGeneration);
    console.log(guessedPrompt);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <FormLabel>Upload Image</FormLabel>
        </AccordionTrigger>
        <AccordionContent className="m-2 flex justify-between items-center">
          <UploadImageForGenerationComponent room={room} />
          <Button onClick={handleButtonClick}>Generate Prompt</Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
