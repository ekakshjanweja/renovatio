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

interface RoomCardProps {
  room: Room;
  projectId: string;
}

export const RoomCard = ({ room, projectId }: RoomCardProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              {room.name}
              <div className="space-x-2 md:space-x-4">
                <Link href={`/${projectId}/${room.id}`}>
                  <Button variant={"outline"}>
                    <MousePointerClick />
                  </Button>
                </Link>

                <Link href={""}>
                  <Button variant={"outline"}>
                    <Trash2 />
                  </Button>
                </Link>
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
