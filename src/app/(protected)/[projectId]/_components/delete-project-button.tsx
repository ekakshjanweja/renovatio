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

interface DeleteProjectButtonProps {
  projectId: string;
}

export const DeleteProjectButton = ({
  projectId,
}: DeleteProjectButtonProps) => {
  const router = useRouter();
  function setRoomName(value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"} className="p-0">
            <Trash2 className="h-4 w-4 m-3" />
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
              <Label htmlFor="roomName" className="sr-only">
                Name
              </Label>
            </div>
            <div className="w-full space-y-1">
              <Label htmlFor="roomDesc" className="sr-only">
                Description
              </Label>
              {/* <Input
                id="text"
                onChange={(e) => setRoomDesc(e.target.value)}
                placeholder={
                  room.description === ""
                    ? "Add Room Description"
                    : `${room.description}`
                }
              /> */}
            </div>
          </div>
          <DialogFooter>
            <Button
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
