"use client";

import { createRoom } from "@/actions/room-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Room } from "@/types/interfaces";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

interface CreateRoomPageProps {
  params: {
    projectId: string;
  };
}

const CreateRoom = ({ params }: CreateRoomPageProps) => {
  const projectId = params.projectId;

  const [roomName, setroomName] = useState("");

  const router = useRouter();

  return (
    <>
      <div className="flex w-full max-w-2xl items-center space-x-2">
        <Input
          type="text"
          placeholder="Room Name"
          name="Room Name"
          onChange={(e) => setroomName(e.target.value)}
        />
        <Button
          variant={"secondary"}
          onClick={async () => {
            const roomId = nanoid();
            const room: Room = {
              id: roomId,
              name: roomName,
              projectId: projectId,
              images: [],
            };

            createRoom(room).then(() => {
              router.push(`/${projectId}/${roomId}`);
            });
          }}
        >
          Create Room
        </Button>
      </div>
    </>
  );
};

export default CreateRoom;
