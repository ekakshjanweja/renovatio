import { auth } from "@/auth";
import { CreateRoomForm } from "./_components/create-room-form";
import { notFound } from "next/navigation";

interface CreateRoomPageProps {
  params: {
    projectId: string;
  };
}

const CreateRoom = async ({ params }: CreateRoomPageProps) => {
  const projectId = params.projectId;

  const session = await auth();

  if (!session) {
    notFound();
  }

  return (
    <>
      <div className="flex w-full items-center justify-center h-[calc(100vh-150px)] space-x-2">
        <CreateRoomForm projectId={projectId} />
      </div>
    </>
  );
};

export default CreateRoom;
