import { getRoomById } from "@/actions/room-action";
import { Room } from "@/types/interfaces";
import { notFound } from "next/navigation";
import { AutoScrollCarousel } from "../_components/auto-scroll-carousel";

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
      <div className="p-6">
        {/* <AutoScrollCarousel images={room.images} /> */}
        {room.name}
      </div>
    </>
  );
};

export default RoomPage;
