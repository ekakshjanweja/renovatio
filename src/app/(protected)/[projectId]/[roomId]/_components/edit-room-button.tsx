"use client";

import { updateRoom } from "@/actions/room-action";
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
import { Room } from "@/types/interfaces";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface EditRoomButtonProps {
  room: Room;
}

export const EditRoomButton = ({ room }: EditRoomButtonProps) => {
  const [roomName, setRoomName] = useState<string | null>(null);
  const [roomDesc, setRoomDesc] = useState<string | null>(null);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"} className="p-0">
            <Pencil className="h-4 w-4 m-3" />
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
              <Input
                id="text"
                onChange={(e) => setRoomName(e.target.value)}
                placeholder={`${room.name}`}
              />
            </div>
            <div className="w-full space-y-1">
              <Label htmlFor="roomDesc" className="sr-only">
                Description
              </Label>
              <Input
                id="text"
                onChange={(e) => setRoomDesc(e.target.value)}
                placeholder={
                  room.description === ""
                    ? "Add Room Description"
                    : `${room.description}`
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (roomName !== null && roomDesc !== null) {
                  updateRoom(room.id, null, roomName, roomDesc).then(() => {});
                }
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
