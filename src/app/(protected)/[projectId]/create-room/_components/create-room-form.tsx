"use client";

import { createRoom } from "@/actions/room-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Room } from "@/types/interfaces";
import { CreateRoomSchema } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CreateRoomFormProps {
  projectId: string;
}

export const CreateRoomForm = ({ projectId }: CreateRoomFormProps) => {
  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  CreateRoomSchema;
  const onSubmit = (values: z.infer<typeof CreateRoomSchema>) => {
    const roomId = nanoid();
    const room: Room = {
      id: roomId,
      name: values.name,
      description: "",
      projectId: projectId,
      imageForGeneration: null,
      images: [],
    };

    createRoom(room);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Room</CardTitle>
          <CardDescription className="text-center">
            Create a room
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Room name" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Descriptions</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Room Description"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" variant="secondary">
                Create Room
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
