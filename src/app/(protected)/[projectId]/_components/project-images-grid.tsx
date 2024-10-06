"use client";

import { deleteImageFromRoom } from "@/actions/room-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types/interfaces";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface ProjectImageGridProps {
  project: Project;
}

export const ProjectImageGrid = ({ project }: ProjectImageGridProps) => {
  return (
    <>
      <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-full mx-auto my-8 gap-y-52">
        {project.images.map((image, index) => (
          <>
            <Card key={index}>
              <CardContent className="p-0 relative">
                <Image
                  src={image}
                  alt={index.toString()}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full aspect-square rounded-xl object-cover"
                  quality={50}
                  loading="lazy"
                />
                <Button
                  variant={"outline"}
                  className="absolute top-2 right-2 p-0"
                  onClick={() => {
                    deleteImageFromRoom(project.id, image);
                  }}
                >
                  <Trash2 className="h-4 w-4 m-2" />
                </Button>
              </CardContent>
            </Card>
          </>
        ))}
      </div>
    </>
  );
};
