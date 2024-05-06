"use client";

import { CreateProjectCardWrapper } from "./creat-project-card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectSchema } from "@/types/zod-schema";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { Button } from "@/components/ui/button";
import { createProject } from "@/actions/create-project";
import { UploadDropzone } from "@/lib/uploadthing";

export const CreateProjectForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      projectName: "",
      clientEmail: "",
      description: "",
      location: "",
      area: "",
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createProject(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <>
      <CreateProjectCardWrapper
        title={"Create Project"}
        description={"We need some details before you get started"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="flex gap-x-4">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Project Name"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Client Email"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-x-4 mt-2 mb-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Location"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Area"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Category"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Description"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-xl outline-dashed outline-muted h-1/2">
                <UploadDropzone
                  endpoint="projectThumbnailUploader"
                  appearance={{
                    container: { height: 200 },
                    uploadIcon: { scale: 0.8 },
                    button: {
                      padding: "20px 20px",
                      background: "#571c9e",
                      margin: "20px 20px",
                    },
                  }}
                  onBeforeUploadBegin={(file) => {
                    // currentProjectId = "test-project";
                    return file;
                  }}
                  onClientUploadComplete={(res) => {
                    // setThumbnailUrl(res?.[0]?.url);
                    // router.refresh();
                    // closeRef?.current?.click();
                  }}
                />
              </div>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="w-full"
              variant="secondary"
              disabled={isPending}
            >
              Create
            </Button>
          </form>
        </Form>
      </CreateProjectCardWrapper>
    </>
  );
};
