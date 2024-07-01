"use client";

import { deleteProject } from "@/actions/project-action";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteProjectButtonProps {
  projectId: string;
}

export const DeleteProjectButton = ({
  projectId,
}: DeleteProjectButtonProps) => {
  const router = useRouter();
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => {
          deleteProject(projectId).then(() => {
            router.push("/dashboard");
          });
        }}
      >
        <Trash2 />
      </Button>
    </>
  );
};
