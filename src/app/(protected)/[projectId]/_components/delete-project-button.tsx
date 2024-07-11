"use client";

import { deleteProject } from "@/actions/project-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteProjectButtonProps {
  projectId: string;
}

export const DeleteProjectButton = ({
  projectId,
}: DeleteProjectButtonProps) => {
  const [confirmation, setConfirmation] = useState<string | null>();

  const router = useRouter();

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"} className="flex gap-x-4 p-4 border border-muted-foreground">
            <p>Delete Project</p>
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Room Details</DialogTitle>
            <DialogDescription>
              Change room name and description.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col justify-between items-center w-full space-y-4">
            <div className="w-full space-y-1">
              <Label htmlFor="roomDesc" className="sr-only">
                Description
              </Label>
              <Input
                id="text"
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder={"type 'delete' to confirm"}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={confirmation !== "delete"}
              onClick={() => {
                deleteProject(projectId).then(() => {
                  router.push("/dashboard");
                });
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
