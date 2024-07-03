import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/types/interfaces";
import { MousePointerClick, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteRoomButton } from "../delete-room-button";

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              {room.name}
              <div className="space-x-2 md:space-x-4">
                <Link href={`/${room.projectId}/${room.id}`}>
                  <Button variant={"outline"}>
                    <MousePointerClick />
                  </Button>
                </Link>
                <DeleteRoomButton roomId={room.id} projectId={room.projectId} />
              </div>
            </div>
          </CardTitle>
          <CardDescription className="flex flex-col">
            <p>{room.id}</p>
            <p>{room.projectId}</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};
