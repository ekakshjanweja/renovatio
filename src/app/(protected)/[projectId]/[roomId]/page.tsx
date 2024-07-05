import { getRoomById, updateRoom } from "@/actions/room-action";
import { Room } from "@/types/interfaces";
import { AutoScrollCarousel } from "../_components/auto-scroll-carousel";
import { UploadRoomImagesComponent } from "./_components/upload-room-images-component";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { RoomImagesGrid } from "./_components/room-images-grid";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

const RoomPage = async ({ params }: RoomPageProps) => {
  const roomId = params.roomId;

  const room: Room = await getRoomById(roomId);

  if (!room) {
    return <>Error</>;
  }

  return (
    <>
      <div className="p-6 mb-16">
        <AutoScrollCarousel images={room.images} isFull />

        <div className="flex flex-col my-4 p-4 border border-muted-foreground border-dotted rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">{room.name}</p>
            <Button variant={"outline"}>
              <Pencil />
            </Button>
          </div>
          <div>
            <p className="text-xl font-medium">Room Description</p>
            <p>
              Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum
              Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume
              Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum
              Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume
              Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum
              Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume
              Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum
              Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume
              Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum
              Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume
              Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum
              Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume
              Lorem Ipsum Lorem Ipsume Lorem Ipsum Lorem Ipsume Lorem Ipsum
              Lorem Ipsume
            </p>
          </div>
          <div></div>
        </div>

        <UploadRoomImagesComponent roomId={roomId} />

        <RoomImagesGrid images={room.images} roomId={room.id} />
      </div>
    </>
  );
};

export default RoomPage;
