"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ReplicateFormSchema } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
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
import { SolaceResultComponent } from "./result";
import { Switch } from "@/components/ui/switch";

export const MainSolaceComponent = ({
  room,
  apiKey,
}: {
  room: Room;
  apiKey: string;
}) => {
  return <></>;
};

