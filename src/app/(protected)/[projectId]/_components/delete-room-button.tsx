"use client";

import { deleteRoom } from "@/actions/room-action";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

interface DeleteRoomButtonProps {
  roomId: string;
  projectId: string;
}

export const DeleteRoomButton = ({
  roomId,
  projectId,
}: DeleteRoomButtonProps) => {
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => {
          deleteRoom(roomId);
          revalidatePath(`/${projectId}`);
        }}
      >
        <Trash2 />
      </Button>
    </>
  );
};
