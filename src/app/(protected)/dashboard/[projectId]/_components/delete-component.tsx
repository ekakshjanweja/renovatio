"use client";

import { deleteProject } from "@/actions/project-action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface DeleteComponentProps {
  projectId: string;
}

export const DeleteComponent = ({ projectId }: DeleteComponentProps) => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        deleteProject(projectId).then((res) => {
          router.push("/dashboard");
        });
      }}
    >
      <Trash />
    </Button>
  );
};
