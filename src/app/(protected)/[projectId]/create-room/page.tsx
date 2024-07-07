import { CreateRoomForm } from "./_components/create-room-form";

interface CreateRoomPageProps {
  params: {
    projectId: string;
  };
}

const CreateRoom = ({ params }: CreateRoomPageProps) => {
  const projectId = params.projectId;

  return (
    <>
      <div className="flex w-full items-center justify-center h-[calc(100vh-150px)] space-x-2">
        <CreateRoomForm projectId={projectId} />
      </div>
    </>
  );
};

export default CreateRoom;
