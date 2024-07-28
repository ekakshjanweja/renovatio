import { auth } from "@/auth";
import { getCurrentUser } from "@/actions/user-action";
import { notFound } from "next/navigation";
import { MainSolaceComponent } from "./_components/main";
import { Room } from "@/types/interfaces";
import { getRoomById } from "@/actions/room-action";

interface SolaceProps {
  params: {
    roomId: string;
  };
}

const Solace = async ({ params }: SolaceProps) => {
  const session = await auth();
  // const USER_ID = [
  //   process.env.TARZI_USER_ID,
  //   process.env.STORMEJ_USER_ID,
  //   process.env.CYTO_USER_ID,
  // ];

  if (!session) {
    notFound();
  }

  const user = await getCurrentUser();

  // if (!USER_ID.find((id) => id === user.id)) {
  //   notFound();
  // }

  if (!user.isDesigner) {
    notFound();
  }

  const roomId = params.roomId;

  const room: Room = await getRoomById(roomId);

  if (!room) {
    return notFound();
  }

  return (
    <>
      <MainSolaceComponent room={room} />
    </>
  );
};

export default Solace;
