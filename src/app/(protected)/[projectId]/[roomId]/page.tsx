import { getRoomById } from "@/actions/room-action";
import { Room } from "@/types/interfaces";
import { AutoScrollCarousel } from "../_components/auto-scroll-carousel";
import { RoomImagesGrid } from "./_components/room-images-grid";
import { EditRoomButton } from "./_components/edit-room-button";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UploadRoomImagesComponent } from "./_components/upload-room-images-component";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

const RoomPage = async ({ params }: RoomPageProps) => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const roomId = params.roomId;

  const room: Room = await getRoomById(roomId);

  if (!room) {
    return <>Error</>;
  }

  return (
    <>
      <div className="p-6 mb-16">
        {room.images.length > 0 ? (
          <AutoScrollCarousel images={room.images} isFull />
        ) : (
          <>
            <div className="py-8">
              <p>Start by adding few renders or sample images for this room</p>
            </div>
          </>
        )}

        <div className="flex flex-col my-4 p-4 border border-muted-foreground border-dotted rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">{room.name}</p>
            <EditRoomButton room={room} />
          </div>
          <div>
            <p>{room.description}</p>
          </div>
          <div className="flex gap-x-4 items-center justify-start">
            <UploadRoomImagesComponent roomId={roomId} />
            <Link href={`/${room.projectId}/${room.id}/solace`}>
              <Button variant={"outline"}>Generate With AI</Button>
            </Link>
          </div>
        </div>

        <RoomImagesGrid images={room.images} roomId={room.id} />
      </div>
    </>
  );
};

export default RoomPage;
